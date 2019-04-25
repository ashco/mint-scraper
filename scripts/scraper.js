/* eslint-disable class-methods-use-this */
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

  async scrapeData(page) {
    const dataObj = {};

    // Scrape Cash
    dataObj.cash = await page.evaluate(() => {
      const cashObj = {};

      cashObj.total = document.querySelector('#moduleAccounts-bank > div > h3 > span.balance').innerText;
      cashObj.accounts = [];

      const accountNodes = Array.from(document.querySelector('#moduleAccounts-bank > ul').childNodes);

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
    });

    await page.$('#moduleAccounts-bank > div > h3 > span.balance').innerText;

    console.log(dataObj);
  }
}

module.exports = Scraper;
