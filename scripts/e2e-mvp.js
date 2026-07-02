// Drives the core MVP loops end-to-end:
//  brand: create + launch a campaign
//  creator: discover it, apply, request a withdrawal
//  both: settings save, logout
const puppeteer = require('puppeteer');

const BASE = 'http://localhost:3000';
const PASSWORD = 'VeroTest!2026';
const CAMPAIGN = `E2E Proof Run ${Date.now().toString().slice(-5)}`;
const OUT = process.argv[2] || '/tmp/vl-e2e';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let failures = 0;
function check(label, ok) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok) failures++;
}

async function login(page, email) {
  await page.goto(`${BASE}/auth`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('input[name="email"]', { timeout: 30000 });
  await page.type('input[name="email"]', email);
  await page.type('input[name="password"]', PASSWORD);
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {}),
  ]);
  await sleep(2000);
}

async function clickByText(page, selector, text) {
  const handle = await page.evaluateHandle(
    (sel, t) => {
      const els = [...document.querySelectorAll(sel)];
      return els.find((e) => e.textContent.trim().toLowerCase().includes(t.toLowerCase()));
    },
    selector,
    text
  );
  const el = handle.asElement();
  if (!el) throw new Error(`No ${selector} containing "${text}"`);
  await el.click();
  return true;
}

async function hasText(page, text) {
  return page.evaluate((t) => document.body.innerText.includes(t), text);
}

(async () => {
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ── BRAND: create campaign ────────────────────────────── */
  const brandCtx = await browser.createBrowserContext();
  const brand = await brandCtx.newPage();
  await brand.setViewport({ width: 1440, height: 900 });
  await login(brand, 'test-brand@verolinkr.test');

  await brand.goto(`${BASE}/brand-dashboard/campaigns`, { waitUntil: 'networkidle2' });
  await sleep(2500);
  await clickByText(brand, 'button', 'New campaign');
  await brand.waitForSelector('div[role="dialog"] input', { timeout: 10000 });
  const inputs = await brand.$$('div[role="dialog"] input');
  await inputs[0].type(CAMPAIGN); // title
  const numInputs = await brand.$$('div[role="dialog"] input[type="number"]');
  await numInputs[0].type('20000'); // budget
  await brand.$eval('div[role="dialog"] textarea', (el) => (el.value = ''));
  await brand.type('div[role="dialog"] textarea', 'E2E test brief — verify the loop.');
  await clickByText(brand, 'div[role="dialog"] button', 'Launch campaign');
  await sleep(3000);
  check('brand: campaign created and listed', await hasText(brand, CAMPAIGN));
  await brand.screenshot({ path: `${OUT}/1-brand-campaign-created.png` });

  /* ── BRAND: settings save ─────────────────────────────── */
  await brand.goto(`${BASE}/brand-dashboard/settings`, { waitUntil: 'networkidle2' });
  await sleep(2000);
  const switchBtn = await brand.$('.dash-switch');
  if (switchBtn) await switchBtn.click();
  await clickByText(brand, 'button', 'Save preferences');
  await brand
    .waitForFunction(() => document.body.innerText.includes('Saved'), { timeout: 20000 })
    .catch(() => {});
  check('brand: settings saved', await hasText(brand, 'Saved'));

  /* ── CREATOR: discover + apply ─────────────────────────── */
  const creatorCtx = await browser.createBrowserContext();
  const creator = await creatorCtx.newPage();
  await creator.setViewport({ width: 1440, height: 900 });
  await login(creator, 'test-creator@verolinkr.test');

  await creator.goto(`${BASE}/creator-dashboard/campaigns`, { waitUntil: 'networkidle2' });
  await creator
    .waitForFunction(
      (t) => document.body.innerText.includes(t),
      { timeout: 30000 },
      CAMPAIGN
    )
    .catch(() => {});
  await sleep(500);
  check('creator: sees the new campaign', await hasText(creator, CAMPAIGN));

  // click the Apply button inside the card containing our campaign title
  await creator.evaluate((title) => {
    const cards = [...document.querySelectorAll('article')];
    const card = cards.find((c) => c.textContent.includes(title));
    const btn = [...card.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Apply');
    btn.click();
  }, CAMPAIGN);
  await sleep(3500);
  check('creator: application confirmed', await hasText(creator, 'Applied'));
  await creator.screenshot({ path: `${OUT}/2-creator-applied.png` });

  // it should now be in "My campaigns"
  await clickByText(creator, 'button', 'My campaigns');
  await sleep(1500);
  check('creator: campaign tracked in my campaigns', await hasText(creator, CAMPAIGN));

  /* ── CREATOR: withdraw ─────────────────────────────────── */
  await creator.goto(`${BASE}/creator-dashboard`, { waitUntil: 'networkidle2' });
  await creator.waitForFunction(
    () => document.body.innerText.includes('AVAILABLE BALANCE'),
    { timeout: 30000 }
  );
  await sleep(800);
  await clickByText(creator, 'button', 'Withdraw');
  await creator.waitForSelector('div[role="dialog"] input[type="number"]', { timeout: 10000 });
  await creator.type('div[role="dialog"] input[type="number"]', '1000');
  await clickByText(creator, 'div[role="dialog"] button', 'Request payout');
  await sleep(3000);
  check('creator: withdrawal accepted', await hasText(creator, 'Request received'));
  await creator.screenshot({ path: `${OUT}/3-creator-withdraw.png` });

  /* ── CREATOR: profile save ─────────────────────────────── */
  await creator.goto(`${BASE}/creator-dashboard/profile`, { waitUntil: 'networkidle2' });
  await creator.waitForFunction(
    () => document.body.innerText.includes('Save profile'),
    { timeout: 30000 }
  );
  await sleep(600);
  await clickByText(creator, 'button', 'Save profile');
  await creator
    .waitForFunction(() => document.body.innerText.includes('Saved'), { timeout: 20000 })
    .catch(() => {});
  check('creator: profile saved', await hasText(creator, 'Saved'));

  /* ── CREATOR: logout via quick settings ────────────────── */
  await creator.click('button[aria-label="Open quick settings"]');
  await sleep(1200);
  await clickByText(creator, 'button', 'Log out');
  await sleep(3000);
  const url = creator.url();
  check('creator: logout returns to landing', url === `${BASE}/` || url === `${BASE}`);

  await browser.close();
  console.log(failures === 0 ? '\nE2E: ALL PASS' : `\nE2E: ${failures} FAILURES`);
  process.exit(failures === 0 ? 0 : 1);
})().catch((e) => {
  console.error('E2E crashed:', e.message);
  process.exit(1);
});
