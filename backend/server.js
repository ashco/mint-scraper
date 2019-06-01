require('dotenv').config();
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const Scraper = require('./lib/scraper');
const db = require('./lib/db');

const { uniqueCount, formatData, sortData } = require('./lib/utils');

require('./lib/cron');

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const scraper = new Scraper();
let globalPage;
let globalBrowser;

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!!');

  try {
    await scraper.runCron();
    res.status(200).send('Fresh data scraped!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.get('/data', async (req, res) => {
  // const {
  //   cashData,
  //   creditCardData,
  //   loanData,
  //   investmentData,
  //   propertyData,
  // } = db.value();
  let data = db.value();

  // filter for only unique values
  // const uniqueCashData = uniqueCount(cashData);
  // const uniqueCreditCardData = uniqueCount(creditCardData);
  // const uniqueLoanData = uniqueCount(loanData);
  // const uniqueInvestmentData = uniqueCount(investmentData);
  // const uniquePropertyData = uniqueCount(propertyData);

  data = formatData(data);
  data = uniqueCount(data);
  console.log(data);
  // const data = formatData({
  //   cashData: uniqueCashData,
  //   creditCardData: uniqueCreditCardData,
  //   loanData: uniqueLoanData,
  //   investmentData: uniqueInvestmentData,
  //   propertyData: uniquePropertyData,
  // });
  // data = sortData(data);

  res.json(data);
});

// app.get('/data-format', async (req, res) => {
//   const {
//     cashData,
//     creditCardData,
//     loanData,
//     investmentData,
//     propertyData,
//   } = db.value();

//   const uniqueCashData = uniqueCount(cashData);
//   const uniqueCreditCardData = uniqueCount(creditCardData);
//   const uniqueLoanData = uniqueCount(loanData);
//   const uniqueInvestmentData = uniqueCount(investmentData);
//   const uniquePropertyData = uniqueCount(propertyData);

//   const data = formatData({
//     cashData: uniqueCashData,
//     creditCardData: uniqueCreditCardData,
//     loanData: uniqueLoanData,
//     investmentData: uniqueInvestmentData,
//     propertyData: uniquePropertyData,
//   });

//   res.json(data);
// });

app.post('/auth-req', async (req, res, next) => {
  console.log('Auth initializing.');

  try {
    const globalPackage = await scraper.init();
    globalPage = globalPackage.page;
    globalBrowser = globalPackage.browser;
    await scraper.authReq(globalPage);
    res.status(200).send();
  } catch (err) {
    console.log('Auth error. Auth may not be necessary.');
    res.status(201).send('You are authenticated.');
    await globalBrowser.close();
  }
});

app.post('/auth-send', async (req, res) => {
  const { authCode } = req.body;

  try {
    await scraper.authSend(globalPage, authCode);
    console.log('Auth successful!');
    res.status(200).send('SUCCESS! Your auth request went swimmingly.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
  await globalBrowser.close();
});

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Mint Scraper Server running on port http://localhost:${port}`);
});
