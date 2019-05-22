let puppeteer;
process.env.NODE_ENV === 'production'
  ? (puppeteer = require('puppeteer-core'))
  : (puppeteer = require('puppeteer'));
const numeral = require('numeral');
const db = require('./db');

class Scraper {
  async loginFill(page) {
    await page.goto('https://mint.intuit.com/overview.event');
    await page.waitForSelector('#ius-userid');

    await page.waitFor(1500);

    const usernameInput = await page.$('#ius-userid');
    const passwordInput = await page.$('#ius-password');

    await usernameInput.type(process.env.MINT_USER);
    await passwordInput.type(process.env.MINT_PASS);
  }

  async login(page) {
    await this.loginFill(page);

    const loginBtn = await page.$('#ius-sign-in-submit-btn');
    await loginBtn.click();
    await page
      .waitForNavigation({ waitUntil: 'networkidle0' })
      .catch(async () => {
        // if timeout occurs it could be because MFA screen shows up
        if ((await page.$('#ius-mfa-wrapper')) !== null) {
          throw Error('MFA has been requested. Please authenticate.');
        } else {
          throw Error('Login failed, but MFA seems to be fine..');
        }
      });
  }

  async authReq(page) {
    return new Promise(async (resolve, reject) => {
      try {
        // await page.setDefaultTimeout(process.env.DEFAULT_TIMEOUT || 30000);

        await this.loginFill(page);
        const loginBtn = await page.$('#ius-sign-in-submit-btn');
        await loginBtn.click();

        await page.waitFor(1000);
        // confirm that MFA needs to happen
        if ((await page.$('#ius-mfa-option-sms')) === null) {
          throw Error(
            'Error! ..but also Success! It appears that you do not need to authenticate.'
          );
        }
        // Select receive sms
        await page.$eval('#ius-mfa-option-sms', el => (el.checked = true));
        // Request SMS
        const reqBtn = await page.$('#ius-mfa-options-submit-btn');
        await reqBtn.click();

        console.log('Authentication SMS code requested.');
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  async authSend(page, authCode) {
    return new Promise(async (resolve, reject) => {
      try {
        // Fill form
        await page.$eval(
          '#ius-mfa-confirm-code',
          (el, code) => {
            el.value = code;
          },
          authCode
        );
        const imgEl = await page.$('#ius-mfa-otp-for-sms-header > div');
        await page.waitFor(1000);
        await imgEl.click();
        await page.waitFor(1000);
        // Click btn
        const authBtn = await page.$('#ius-mfa-otp-submit-btn');
        await authBtn.click();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  async scrapeData(page, totalEl, accountEl) {
    const overviewUrl = 'https://mint.intuit.com/overview.event';

    if (page.url() !== overviewUrl) {
      await page.goto(overviewUrl);
      await page.waitForSelector('#module-accounts');
    }

    return page.evaluate(
      async (totalEl, accountEl) => {
        const dataObj = {};
        dataObj.accounts = [];

        const totalText = document.querySelector(totalEl).innerText;
        // Convert to number
        dataObj.total = await window.convertNum(totalText);

        const accountNodes = Array.from(
          document.querySelector(accountEl).childNodes
        );

        accountNodes.forEach(account => {
          const accountObj = {};

          accountObj.accountName = account.getElementsByClassName(
            'accountName'
          )[0].innerText;
          const balance = account.getElementsByClassName('balance')[0]
            .innerText;
          accountObj.balance = parseFloat(
            balance.replace('$', '').replace(',', '')
          );
          accountObj.updated = account.getElementsByClassName(
            'last-updated'
          )[0].innerText;
          accountObj.institution = account.getElementsByClassName(
            'nickname'
          )[0].innerText;

          const errorMsg = account.getElementsByClassName('error-on-click')[0]
            .innerText;
          accountObj.errorMsg =
            errorMsg === 'Default error message' ? false : errorMsg;

          dataObj.accounts.push(accountObj);
        });

        return dataObj;
      },
      totalEl,
      accountEl
    );
  }

  async scrapeCashData(page) {
    const totalEl = '#moduleAccounts-bank > div > h3 > span.balance';
    const accountEl = '#moduleAccounts-bank > ul';

    return this.scrapeData(page, totalEl, accountEl);
  }

  async scrapeCreditCardData(page) {
    const totalEl =
      '#moduleAccounts-credit > div > h3 > span.balance.negativeBalance';
    const accountEl = '#moduleAccounts-credit > ul';

    return this.scrapeData(page, totalEl, accountEl);
  }

  async scrapeLoanData(page) {
    const totalEl =
      '#moduleAccounts-loan > div > h3 > span.balance.negativeBalance';
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

  async init() {
    const browserConfig =
      process.env.NODE_ENV === 'production'
        ? {
            headless: true,
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--headless',
              '--disable-gpu',
            ],
            executablePath: '/usr/bin/chromium-browser',
          }
        : {
            headless: true,
          };

    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();
    await page.setDefaultTimeout(process.env.DEFAULT_TIMEOUT || 30000);

    return { browser, page };
  }

  async scrape() {
    return new Promise(async (resolve, reject) => {
      const { browser, page } = await this.init();

      try {
        await page.exposeFunction('convertNum', text => numeral(text).value());

        await this.login(page);

        const [
          cashData,
          creditCardData,
          loanData,
          investmentData,
          propertyData,
        ] = await Promise.all([
          this.scrapeCashData(page),
          this.scrapeCreditCardData(page),
          this.scrapeLoanData(page),
          this.scrapeInvestmentData(page),
          this.scrapePropertyData(page),
        ]);

        console.log('Data Scraped!');
        resolve({
          cashData,
          creditCardData,
          loanData,
          investmentData,
          propertyData,
        });
      } catch (err) {
        reject(err);
      }
      await browser.close();
    });
  }

  async runCron() {
    let cashData;
    let creditCardData;
    let loanData;
    let investmentData;
    let propertyData;

    await this.scrape()
      .then(res => {
        cashData = res.cashData;
        creditCardData = res.creditCardData;
        loanData = res.loanData;
        investmentData = res.investmentData;
        propertyData = res.propertyData;

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
      })
      .catch(err => {
        console.error(err);
      });
  }
}

module.exports = Scraper;
