/* eslint-disable class-methods-use-this */
const puppeteer = require('puppeteer');
const numeral = require('numeral');
const db = require('./db');


const cookiesArr = require('../cookies.json');

class Scraper {
  async setCookies(page) {
    console.log('🍪 Setting Cookies');
    for (const cookie of cookiesArr) {
      await page.setCookie(cookie);
    }
  }

  async login(page) {
    await page.goto('https://mint.intuit.com/overview.event');
    await page.waitForSelector('#ius-userid');

    await page.waitFor(1500);

    const usernameInput = await page.$('#ius-userid');
    const passwordInput = await page.$('#ius-password');
    const loginBtn = await page.$('#ius-sign-in-submit-btn');

    await usernameInput.type(process.env.LOGINUSER);
    await passwordInput.type(process.env.LOGINPASS);
    await loginBtn.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  }

  async scrapeData(page, totalEl, accountEl) {
    const overviewUrl = 'https://mint.intuit.com/overview.event';

    if (page.url() !== overviewUrl) {
      await page.goto(overviewUrl);
      await page.waitForSelector('#module-accounts');
    }

    return page.evaluate(async (totalEl, accountEl) => {
      const dataObj = {};
      dataObj.accounts = [];

      const totalText = document.querySelector(totalEl).innerText;
      // Convert to number
      dataObj.total = await window.convertNum(totalText);

      const accountNodes = Array.from(document.querySelector(accountEl).childNodes);


      accountNodes.forEach((account) => {
        const accountObj = {};

        accountObj.accountName = account.getElementsByClassName('accountName')[0].innerText;
        const balance = account.getElementsByClassName('balance')[0].innerText;
        accountObj.balance = parseFloat(balance.replace('$', '').replace(',', ''));
        accountObj.updated = account.getElementsByClassName('last-updated')[0].innerText;
        accountObj.institution = account.getElementsByClassName('nickname')[0].innerText;

        const errorMsg = account.getElementsByClassName('error-on-click')[0].innerText;
        accountObj.errorMsg = errorMsg === 'Default error message'
          ? false
          : errorMsg;

        dataObj.accounts.push(accountObj);
      });

      return dataObj;
    }, totalEl, accountEl);
  }

  async scrapeCashData(page) {
    const totalEl = '#moduleAccounts-bank > div > h3 > span.balance';
    const accountEl = '#moduleAccounts-bank > ul';

    return this.scrapeData(page, totalEl, accountEl);
  }

  async scrapeCreditCardData(page) {
    const totalEl = '#moduleAccounts-credit > div > h3 > span.balance.negativeBalance';
    const accountEl = '#moduleAccounts-credit > ul';

    return this.scrapeData(page, totalEl, accountEl);
  }

  async scrapeLoanData(page) {
    const totalEl = '#moduleAccounts-loan > div > h3 > span.balance.negativeBalance';
    const accountEl = '#moduleAccounts-loan > ul';

    return this.scrapeData(page, totalEl, accountEl);
  }

  async scrapeInvestmentData(page) {
    const totalEl = '#moduleAccounts-investment > div > h3 > span.balance';
    const accountEl = '#moduleAccounts-investment > ul';

    return this.scrapeData(page, totalEl, accountEl);
  }

  async scrapePropertyData(page) {
    const totalEl = '#moduleAccounts-property > div > h3 > span.balance';
    const accountEl = '#moduleAccounts-property > ul';

    return this.scrapeData(page, totalEl, accountEl);
  }

  async run() {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({
          // headless: process.env.NODE_ENV === 'production',
          headless: false,
        });
        const page = await browser.newPage();
        await page.setDefaultTimeout(300000); // 5 minutes
        await page.exposeFunction('convertNum', text => numeral(text).value());

        await this.login(page);

        const [cashData, creditCardData, loanData, investmentData, propertyData] = await Promise.all([
          this.scrapeCashData(page),
          this.scrapeCreditCardData(page),
          this.scrapeLoanData(page),
          this.scrapeInvestmentData(page),
          this.scrapePropertyData(page),
        ]);

        await browser.close();

        console.log('Data Scraped!');
        resolve({
          cashData, creditCardData, loanData, investmentData, propertyData,
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async runCron() {
    const {
      cashData, creditCardData, loanData, investmentData, propertyData,
    } = await this.run();

    db.get('cashData')
      .push({
        date: Date.now(),
        data: cashData,
      })
      .write();
    db.get('creditCardData')
      .push({
        date: Date.now(),
        data: creditCardData,
      })
      .write();
    db.get('loanData')
      .push({
        date: Date.now(),
        data: loanData,
      })
      .write();
    db.get('investmentData')
      .push({
        date: Date.now(),
        data: investmentData,
      })
      .write();
    db.get('propertyData')
      .push({
        date: Date.now(),
        data: propertyData,
      })
      .write();
  }
}

module.exports = Scraper;
