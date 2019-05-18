const express = require('express');

const cors = require('cors');
const Scraper = require('./lib/scraper');
const db = require('./lib/db');

const { uniqueCount } = require('./lib/utils');

require('dotenv').config();
require('./lib/cron');


const app = express();
app.use(cors());

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!!');

  const scraper = new Scraper();
  const dataObj = await scraper.run();

  res.json(dataObj);
});

app.get('/data', async (req, res, next) => {
  const { accountData } = db.value();
  // filter for only unique values
  const uniqueData = uniqueCount(accountData);
  console.log(uniqueData);

  res.json({ accountData: uniqueData });
});

const port = 5555;

app.listen(port, () => {
  console.log(`Example App running on port http://localhost:${port}`);
});
