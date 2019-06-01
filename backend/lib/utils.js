/**
 * Formats data to simplified array of objects.
 * @param {Object} data - object of saved database.
 * @returns {Object} formattedData - [{
  * date,
    totalCash,
    totalCreditCard,
    totalLoans,
    totalInvestments,
    totalProperty,
 * }]
 */

function formatData(data) {
  const accounts = {
    totalCash: data.cashData,
    totalCreditCard: data.creditCardData,
    totalLoans: data.loanData,
    totalInvestments: data.investmentData,
    totalProperty: data.propertyData,
  };

  const formattedData = [{}];

  // create all objects with timestamps.
  Object.values(accounts).forEach((account, i) => {
    account.forEach((scrape, j) => {
      const key = Object.keys(accounts)[i];
      const value = scrape.data.total;

      if (i === 0) {
        formattedData.push({
          date: scrape.date,
        });
      }
      formattedData[j][key] = value;
    });
  });

  return formattedData;
}

function addNetWorthData(data) {
  data.forEach(scrape => {
    const netWorth =
      scrape.totalCash +
      scrape.totalCreditCard +
      scrape.totalLoans +
      scrape.totalInvestments +
      scrape.totalProperty;

    scrape.totalNetWorth = netWorth;
  });
}

/**
 * Filters filtered data into
 * @param {Object} data - object of saved database.
 */
function uniqueCount(data) {
  const uniqueData = data.filter((item, i, arr) => {
    if (i === 0) return true; // keep it, its the first one
    const lastItem = arr[i - 1];

    return !(
      item.totalCash === lastItem.totalCash &&
      item.totalCreditCard === lastItem.totalCreditCard &&
      item.totalLoans === lastItem.totalLoans &&
      item.totalInvestments === lastItem.totalInvestments &&
      item.totalProperty === lastItem.totalProperty
    );
  });

  return uniqueData;
}

module.exports = { uniqueCount, addNetWorthData, formatData };
