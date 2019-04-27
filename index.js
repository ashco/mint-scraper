const express = require('express');

const Scraper = require('./libs/scraper');

require('dotenv').config();

const app = express();

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!!');

  const scraper = new Scraper();
  const dataObj = await scraper.init();

  console.log(dataObj);

  res.json(dataObj);
});


const port = 5555;

const server = app.listen(port, () => {
  console.log(`Example App running on port http://localhost:${port}`);
});


console.log({ server });
