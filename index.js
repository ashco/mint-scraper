const express = require('express');

const Scraper = require('./lib/scraper');
const db = require('./lib/db');

require('dotenv').config();
require('./lib/cron');

const app = express();

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!!');

  const scraper = new Scraper();
  const dataObj = await scraper.run();

  res.json(dataObj);
});


const port = 5555;

app.listen(port, () => {
  console.log(`Example App running on port http://localhost:${port}`);
});


