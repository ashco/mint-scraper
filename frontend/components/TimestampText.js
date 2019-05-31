import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { distanceInWords } from 'date-fns';

import { ScrapeContext } from './ScrapeContext';

const TimestampText = () => {
  const { scrapes } = useContext(ScrapeContext);

  let timestamp = false;
  // This is disgusting, but works for now..
  if (scrapes.length > 0) {
    const latestDate = scrapes.reduce(
      (acc, cur) => (acc < cur.date ? cur.date : acc),
      0
    );

    timestamp = distanceInWords(new Date(latestDate), new Date());
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
