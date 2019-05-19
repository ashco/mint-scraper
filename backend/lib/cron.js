const cron = require('node-cron');
const Scraper = require('./scraper');

// http://corntab.com/
cron.schedule('*/5 * * * *', async () => {
  console.log('⏲️ RUNNING THE CRON');

  const scraper = new Scraper();
  scraper.runCron();
});
