const puppeteer = require('puppeteer');

const Scraper = require('./scripts/scraper');

const scraper = new Scraper();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // args: [
    //   `--disable-extensions-except=${pathToExtension}`,
    //   `--load-extension=${pathToExtension}`
    // ]
  });
  const page = await browser.newPage();

  await page.goto('https://mint.intuit.com/overview.event');


  // other actions...


  // await browser.close();
})();
