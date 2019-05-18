const express = require('express');

const cors = require('cors');
const Scraper = require('./lib/scraper');
const db = require('./lib/db');

const { uniqueCount } = require('./lib/utils');

require('dotenv').config();
require('./lib/cron');


const app = express();
app.use(cors());

app.get('/scrape', async (req, res) => {
  console.log('Scraping!!');
  const scraper = new Scraper();

  const {
    cashData, creditCardData, loanData, investmentData, propertyData,
  } = await scraper.run();

  res.json({
    cashData, creditCardData, loanData, investmentData, propertyData,
  });
});

app.get('/data', async (req, res) => {
  const {
    cashData, creditCardData, loanData, investmentData, propertyData,
  } = db.value();

  // filter for only unique values
  const uniqueCashData = uniqueCount(cashData);
  const uniqueCreditCardData = uniqueCount(creditCardData);
  const uniqueLoanData = uniqueCount(loanData);
  const uniqueInvestmentData = uniqueCount(investmentData);
  const uniquePropertyData = uniqueCount(propertyData);


  // res.json({
  //   cashData, creditCardData, loanData, investmentData, propertyData,
  // });
  res.json({
    cashData: uniqueCashData, creditCardData: uniqueCreditCardData, loanData: uniqueLoanData, investmentData: uniqueInvestmentData, propertyData: uniquePropertyData,
  });
});

const port = 5555;

app.listen(port, () => {
  console.log(`Example App running on port http://localhost:${port}`);
});
