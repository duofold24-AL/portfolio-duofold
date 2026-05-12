import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER_ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE_ERROR:', error.message);
  });

  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' }).catch(e => console.log(e));
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
