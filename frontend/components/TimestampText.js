import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { distanceInWords } from 'date-fns';

import { ScrapeContext } from './ScrapeContext';

const TimestampText = () => {
  const { scrapes } = useContext(ScrapeContext);

  const getTimestamp = scrapes => {
    const scrapeArr = [
      scrapes.cashData[scrapes.cashData.length - 1].date,
      scrapes.creditCardData[scrapes.creditCardData.length - 1].date,
      scrapes.loanData[scrapes.loanData.length - 1].date,
      scrapes.investmentData[scrapes.investmentData.length - 1].date,
      scrapes.propertyData[scrapes.propertyData.length - 1].date,
    ];

    const latestScrape = scrapeArr.reduce((acc, cur) => {
      if (acc < cur) {
        acc = cur;
      }
      return acc;
    }, 0);

    const timestamp = distanceInWords(new Date(latestScrape), new Date());

    return timestamp;
  };

  let timestamp = false;
  // This is disgusting, but works for now..
  if (scrapes.cashData.length > 0) {
    timestamp = getTimestamp(scrapes);
  }

  return (
    <TimestampTextStyle>
      {timestamp ? `Last scraped ${timestamp} ago` : 'Fetching data..'}
    </TimestampTextStyle>
  );
};

const TimestampTextStyle = styled.h3`
  color: var(--bg-color);
  font-size: 18px;
  font-weight: 300;
`;

export default TimestampText;
