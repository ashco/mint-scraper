function uniqueCount(scrapes) {
  return scrapes.filter((item, i, arr) => {
    if (i === 0) return true; // keep it, its the first one
    const lastItem = arr[i - 1];
    return !(item.data.total === lastItem.data.total);
  });
}

function formatData({
  cashData,
  creditCardData,
  loanData,
  investmentData,
  propertyData,
}) {
  const accounts = [
    cashData,
    creditCardData,
    loanData,
    investmentData,
    propertyData,
  ];

  const key = [
    'totalCash',
    'totalCreditCard',
    'totalLoans',
    'totalInvestments',
    'totalProperty',
  ];

  const data = [];

  // create all objects with timestamps.
  accounts.forEach(account => {
    account.forEach(scrape => {
      data.push({
        date: scrape.date,
        totalCash: null,
        totalCreditCard: null,
        totalLoans: null,
        totalInvestments: null,
        totalProperty: null,
      });
    });
  });

  // go through each account and place data in appropriate object spot
  accounts.forEach((account, i) => {
    account.forEach(scrape => {
      const { date } = scrape;
      const { total } = scrape.data;

      // find data index of object with same date.
      const index = data.findIndex(obj => obj.date === date);
      // add total number to data index object's totalCash section
      data[index][key[i]] = total;
    });
  });
  return data;
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

module.exports = { uniqueCount, formatData };
