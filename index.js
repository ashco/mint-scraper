require('dotenv').config();

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

  await scraper.login(page);

  const dataObj = await scraper.scrapeData(page);


  // other actions...


  // await browser.close();
})();
