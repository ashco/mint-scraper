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
          cashData: null,
          creditCardData: null,
          loanData: null,
          investmentData: null,
          propertyData: null,
        });
      }
      formattedData[j][key] = [value];
    });
  });

  return formattedData;
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

/**
 * sort array from oldest to newest
 * @param {Object} data - object of saved database.
 */
function sortData(data) {
  data.sort((a, b) => a.date - b.date);
}

// Want to format data like..
// const data = [
//   {
//     date: 12345678,
//     totalCash: 19762.39,
//     totalCreditCard: 197162.39,
//     totalLoans: 1972.39,
//     totalInvestments: 119762.39,
//     totalProperty: 1762.39,
//   },
// ];

module.exports = { uniqueCount, formatData, sortData };
