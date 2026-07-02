// Logs in as the seeded test creator + brand and screenshots every dashboard
// page. Usage: node --env-file=.env.local scripts/audit-dashboards.js <outDir>
const puppeteer = require('puppeteer');

const OUT = process.argv[2] || '/tmp/vl-audit';
const BASE = 'http://localhost:3000';
const PASSWORD = 'VeroTest!2026';

const ROLES = {
  creator: {
    email: 'test-creator@verolinkr.test',
    home: '/creator-dashboard',
    pages: ['', '/campaigns', '/connections', '/gigs', '/analytics', '/profile', '/settings'],
  },
  brand: {
    email: 'test-brand@verolinkr.test',
    home: '/brand-dashboard',
    pages: ['', '/campaigns', '/creators', '/analytics', '/profile', '/settings'],
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const [role, cfg] of Object.entries(ROLES)) {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${role}] ${m.text()}`); });
    page.on('pageerror', (e) => errors.push(`[${role}] PAGEERROR ${e}`));

    // login
    await page.goto(`${BASE}/auth`, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('input[name="email"]', { timeout: 30000 });
    await page.type('input[name="email"]', cfg.email);
    await page.type('input[name="password"]', PASSWORD);
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {}),
    ]);
    await sleep(2500);
    console.log(`${role} logged in, at: ${page.url()}`);

    for (const p of cfg.pages) {
      const url = `${BASE}${cfg.home}${p}`;
      const name = `${role}-${p ? p.slice(1) : 'home'}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        // wait for auth/profile fetches to settle and the spinner to leave
        await page.waitForFunction(
          () => !document.querySelector('.spinner') && !/^\s*loading\s*$/i.test(document.body.innerText.trim()),
          { timeout: 30000 }
        ).catch(() => {});
        await sleep(3000);
        await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
        console.log(`ok  ${name}  (${page.url()})`);
      } catch (e) {
        console.log(`FAIL ${name}: ${e.message}`);
      }
    }
    fs.writeFileSync(`${OUT}/${role}-console-errors.txt`, errors.join('\n') || 'none');
    await context.close();
  }
  await browser.close();
  console.log('AUDIT DONE →', OUT);
}

run().catch((e) => { console.error(e); process.exit(1); });
