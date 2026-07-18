import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:3000');
  await new Promise(r => setTimeout(r, 3000));
  
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log("HTML LENGTH:", html.length);
  const text = await page.evaluate(() => document.body.innerText);
  console.log("PAGE TEXT HEAD:\n", text.slice(0, 300));
  
  await browser.close();
})();
