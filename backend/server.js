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

/**
 * Route to request data scrape and save data to database.
 */
app.get('/scrape', async (req, res, next) => {
  try {
    await scraper.scrapeAndSave();
    res.status(200).send('Fresh data scraped!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

/**
 * Route to get scrape data loaded in database
 */
app.get('/data', async (req, res) => {
  let data = db.value();

  if (Object.keys(data).length > 0) {
    data = formatData(data);
    addNetWorthData(data);
    data = filterIncomplete(data);
    data = uniqueCount(data);
  }

  res.json(data);
});

/**
 * Route to initialize auth request, will send SMS to phone
 */
app.post('/auth-req', async (req, res, next) => {
  console.log('Authentication request sent.');

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

/**
 * Route to provide auth code. Also runs scraper function.
 */
app.post('/auth-send', async (req, res) => {
  console.log('Authentication verification code sent.');
  const { authCode } = req.body;

  try {
    await scraper.authSend(globalPage, authCode);
    await scraper.scrapeAndSave();
    res
      .status(200)
      .send('SUCCESS! You have been authenticated and data has been scraped.');
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
