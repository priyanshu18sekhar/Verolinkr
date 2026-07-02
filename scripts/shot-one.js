// Screenshot a single dashboard page as a given role.
// Usage: node scripts/shot-one.js <creator|brand> <path> <outfile>
const puppeteer = require('puppeteer');

const [, , role, pagePath, outFile] = process.argv;
const BASE = 'http://localhost:3000';
const PASSWORD = 'VeroTest!2026';
const EMAIL = role === 'brand' ? 'test-brand@verolinkr.test' : 'test-creator@verolinkr.test';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e));

  await page.goto(`${BASE}/auth`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('input[name="email"]', { timeout: 30000 });
  await page.type('input[name="email"]', EMAIL);
  await page.type('input[name="password"]', PASSWORD);
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {}),
  ]);
  await sleep(1500);

  await page.goto(`${BASE}${pagePath}`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForFunction(
    () => !document.querySelector('.spinner'),
    { timeout: 30000 }
  ).catch(() => {});
  await sleep(2500);
  await page.screenshot({ path: outFile, fullPage: true });
  console.log('URL:', page.url());
  console.log('ERRORS:', errors.length ? errors.slice(0, 10).join('\n') : 'none');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
