const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2] || 'http://localhost:3001/';
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => {
    const args = msg.args();
    Promise.all(args.map(a => a.jsonValue())).then(vals => {
      console.log('[BROWSER CONSOLE]', msg.type(), ...vals);
    }).catch(() => {
      console.log('[BROWSER CONSOLE]', msg.type(), msg.text());
    });
  });

  page.on('pageerror', err => {
    console.error('[PAGE ERROR]', err.stack || err.message || err);
  });

  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Status:', resp.status());
    // wait a bit for any deferred client-side errors
    await page.waitForTimeout(3000);
  } catch (err) {
    console.error('Navigation failed:', err.message);
  }

  await browser.close();
  process.exit(0);
})();
