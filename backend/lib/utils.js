/**
 * Formats data to simplified array of objects.
 * @param {Object} data - object of saved database.
 */

function formatData(data) {
  const accounts = {
    totalCash: data.cashData,
    totalCreditCard: data.creditCardData,
    totalLoans: data.loanData,
    totalInvestments: data.investmentData,
    totalProperty: data.propertyData,
  };

  // const formattedData = [{}];
  const formattedData = {};

  // create all objects with timestamps.
  Object.values(accounts).forEach((account, i) => {
    console.log(account.length);
    account.forEach((scrape, j) => {
      const key = Object.keys(accounts)[i];
      const value = scrape.data.total;

      // look up scrapes date
      const { date } = scrape;
      const roundedDate = date - (date % 1000);
      // if date is not currently in formattedData object, create empty object
      if (formattedData[roundedDate] === undefined) {
        formattedData[roundedDate] = {
          date: roundedDate,
          totalCash: null,
          totalCreditCard: null,
          totalLoans: null,
          totalInvestments: null,
          totalProperty: null,
        };
      }
      formattedData[roundedDate][key] = value;
    });
  });

  return formattedData;
}

function addNetWorthData(data) {
  Object.values(data).forEach(scrape => {
    let netWorth =
      scrape.totalCash +
      scrape.totalCreditCard +
      scrape.totalLoans +
      scrape.totalInvestments +
      scrape.totalProperty;

    // fix javascript math issues
    netWorth = Math.round(netWorth * 100) / 100;

    scrape.totalNetWorth = netWorth;
  });
}

function filterIncomplete(data) {
  const filteredData = Object.values(data).filter(scrape =>
    Object.values(scrape).every(total => total !== null)
  );

  return filteredData;
}

/**
 * Filters filtered data into
 * @param {Object} data - object of saved database.
 */
function uniqueCount(data) {
  const uniqueData = Object.values(data).filter((item, i, arr) => {
    if (i === 0) return true; // keep it, its the first one
    const lastItem = arr[i - 1];

    return !(item.totalNetWorth === lastItem.totalNetWorth);
  });

  return uniqueData;
}

module.exports = { uniqueCount, addNetWorthData, filterIncomplete, formatData };
