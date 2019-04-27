/* eslint-disable class-methods-use-this */
const puppeteer = require('puppeteer');

class Scraper {
  async login(page) {
    await page.goto('https://mint.intuit.com/overview.event');
    await page.waitForSelector('#ius-userid');

    const usernameInput = await page.$('#ius-userid');
    const passwordInput = await page.$('#ius-password');
    const loginBtn = await page.$('#ius-sign-in-submit-btn');

    await usernameInput.type(process.env.LOGINUSER);
    await passwordInput.type(process.env.LOGINPASS);
    await loginBtn.click();

    await page.waitForSelector('#module-accounts');
  }

  // // TODO Figure out why this isn't working
  // assignAccountData (accountNodes, accountObj) {
  //   accountNodes.forEach((account) => {
  //     const obj = {};

  //     obj.accountName = account.getElementsByClassName('accountName')[0].innerText;
  //     obj.balance = account.getElementsByClassName('balance')[0].innerText;
  //     obj.updated = account.getElementsByClassName('last-updated')[0].innerText;
  //     obj.institution = account.getElementsByClassName('nickname')[0].innerText;

  //     const errorMsg = account.getElementsByClassName('error-on-click')[0].innerText;
  //     obj.errorMsg = errorMsg === 'Default error message'
  //       ? false
  //       : errorMsg;

  //     accountObj.accounts.push(obj);
  //   });
  // }

  async getData(page) {
    const dataObj = {};

    // Scrape Cash
    dataObj.cash = await page.evaluate((assignAccountData) => {
      const cashObj = {};

      cashObj.accounts = [];
      cashObj.total = document.querySelector('#moduleAccounts-bank > div > h3 > span.balance').innerText;

      const accountNodes = Array.from(document.querySelector('#moduleAccounts-bank > ul').childNodes);

      // assignAccountData(accountNodes, cashObj);

      accountNodes.forEach((account) => {
        const obj = {};

        obj.accountName = account.getElementsByClassName('accountName')[0].innerText;
        obj.balance = account.getElementsByClassName('balance')[0].innerText;
        obj.updated = account.getElementsByClassName('last-updated')[0].innerText;
        obj.institution = account.getElementsByClassName('nickname')[0].innerText;

        const errorMsg = account.getElementsByClassName('error-on-click')[0].innerText;
        obj.errorMsg = errorMsg === 'Default error message'
          ? false
          : errorMsg;

        cashObj.accounts.push(obj);
      });

      return cashObj;
    }, this.assignAccountData);

    // Credit Cards
    dataObj.creditCards = await page.evaluate((assignAccountData) => {
      const creditCardsObj = {};
      creditCardsObj.accounts = [];

      creditCardsObj.total = document.querySelector('#moduleAccounts-credit > div > h3 > span.balance.negativeBalance').innerText;

      const accountNodes = Array.from(document.querySelector('#moduleAccounts-credit > ul').childNodes);

      // assignAccountData(accountNodes, creditCardsObj);

      accountNodes.forEach((account) => {
        const obj = {};

        obj.accountName = account.getElementsByClassName('accountName')[0].innerText;
        obj.balance = account.getElementsByClassName('balance')[0].innerText;
        obj.updated = account.getElementsByClassName('last-updated')[0].innerText;
        obj.institution = account.getElementsByClassName('nickname')[0].innerText;

        const errorMsg = account.getElementsByClassName('error-on-click')[0].innerText;
        obj.errorMsg = errorMsg === 'Default error message'
          ? false
          : errorMsg;

        creditCardsObj.accounts.push(obj);
      });

      return creditCardsObj;
    }, this.assignAccountData);

    // Loans
    dataObj.loans = await page.evaluate(() => {
      const loansObj = {};
      loansObj.accounts = [];

      loansObj.total = document.querySelector('#moduleAccounts-loan > div > h3 > span.balance.negativeBalance').innerText;

      const accountNodes = Array.from(document.querySelector('#moduleAccounts-loan > ul').childNodes);


      accountNodes.forEach((account) => {
        const obj = {};

        obj.accountName = account.getElementsByClassName('accountName')[0].innerText;
        obj.balance = account.getElementsByClassName('balance')[0].innerText;
        obj.updated = account.getElementsByClassName('last-updated')[0].innerText;
        obj.institution = account.getElementsByClassName('nickname')[0].innerText;

        const errorMsg = account.getElementsByClassName('error-on-click')[0].innerText;
        obj.errorMsg = errorMsg === 'Default error message'
          ? false
          : errorMsg;

        loansObj.accounts.push(obj);
      });

      return loansObj;
    });

    // Investments
    dataObj.investments = await page.evaluate(() => {
      const investmentsObj = {};
      investmentsObj.accounts = [];

      investmentsObj.total = document.querySelector('#moduleAccounts-investment > div > h3 > span.balance').innerText;

      const accountNodes = Array.from(document.querySelector('#moduleAccounts-investment > ul').childNodes);


      accountNodes.forEach((account) => {
        const obj = {};

        obj.accountName = account.getElementsByClassName('accountName')[0].innerText;
        obj.balance = account.getElementsByClassName('balance')[0].innerText;
        obj.updated = account.getElementsByClassName('last-updated')[0].innerText;
        obj.institution = account.getElementsByClassName('nickname')[0].innerText;

        const errorMsg = account.getElementsByClassName('error-on-click')[0].innerText;
        obj.errorMsg = errorMsg === 'Default error message'
          ? false
          : errorMsg;

        investmentsObj.accounts.push(obj);
      });

      return investmentsObj;
    });

    // Property
    dataObj.property = await page.evaluate(() => {
      const propertyObj = {};
      propertyObj.accounts = [];

      propertyObj.total = document.querySelector('#moduleAccounts-property > div > h3 > span.balance').innerText;

      const accountNodes = Array.from(document.querySelector('#moduleAccounts-property > ul').childNodes);


      accountNodes.forEach((account) => {
        const obj = {};

        obj.accountName = account.getElementsByClassName('accountName')[0].innerText;
        obj.balance = account.getElementsByClassName('balance')[0].innerText;
        obj.updated = account.getElementsByClassName('last-updated')[0].innerText;
        obj.institution = account.getElementsByClassName('nickname')[0].innerText;

        const errorMsg = account.getElementsByClassName('error-on-click')[0].innerText;
        obj.errorMsg = errorMsg === 'Default error message'
          ? false
          : errorMsg;

        propertyObj.accounts.push(obj);
      });

      return propertyObj;
    });

    return dataObj;
  }

  async init() {
    return new Promise(async (resolve, reject) => {
      console.log(process.env.NODE_ENV);
      const browser = await puppeteer.launch({
        headless: process.env.NODE_ENV === 'production',
      });
      const page = await browser.newPage();

      await this.login(page);
      const dataObj = await this.getData(page);

      await browser.close();
      resolve(dataObj);
    });
  }
}

module.exports = Scraper;
