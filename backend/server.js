require('dotenv').config();
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const Scraper = require('./lib/scraper');
const db = require('./lib/db');

const {
  uniqueCount,
  addNetWorthData,
  filterIncomplete,
  formatData,
} = require('./lib/utils');

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
  console.log('Data requested.');
  let data = db.value();

  if (Object.keys(data).length < 1) {
    res.json('No data!');
    return;
  }

  data = formatData(data);
  addNetWorthData(data);
  data = filterIncomplete(data);
  data = uniqueCount(data);

  res.json(data);
});

app.post('/auth-req', async (req, res, next) => {
  console.log('Auth requested.');

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
  console.log('Auth code sent.');
  const { authCode } = req.body;

  try {
    await scraper.authSend(globalPage, authCode);
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
