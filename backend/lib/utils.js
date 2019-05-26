function uniqueCount(scrapes) {
  return scrapes.filter((item, i, arr) => {
    if (i === 0) return true; // keep it, its the first one
    const lastItem = arr[i - 1];
    return !(item.data.total === lastItem.data.total);
  });
}

function getOverviewData({
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
  const overviewData = [];
  // go through every cashData object and add it to overview data object with date. Other properties (totalCreditCard) will be marked as null.

  // create objects
  accounts.forEach(account => {
    account.forEach(scrape => {
      overviewData.push({
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
  cashData.forEach(scrape => {
    const { date } = scrape;
    const { total } = scrape.data;

    // find overviewData index of object with same date.
    const i = overviewData.findIndex(obj => obj.date === date);
    // add total number to overviewData index object's totalCash section
    overviewData[i].totalCash = total;
  });

  return overviewData;
}

// Want to format data like..
const overviewData = [
  {
    date: 12345678,
    totalCash: 19762.39,
    totalCreditCard: 197162.39,
    totalLoans: 1972.39,
    totalInvestments: 119762.39,
    totalProperty: 1762.39,
  },
];

module.exports = { uniqueCount, getOverviewData };
