import puppeteer from 'puppeteer';
import Scraper from './libs/scraper';

require('dotenv').config();

const scraper = new Scraper();

(async () => {
  try {
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
    console.log(dataObj);


    // other actions...


    // await browser.close();
  } catch (error) {
    console.error('ERROR:', error);
  }
})();
