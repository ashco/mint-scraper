import React from 'react';
import styled from 'styled-components';
import { distanceInWords } from 'date-fns';
import formatCurrency from '../libs/formatCurrency';

export default function Table({ scrapes, title }) {
  const scrapesReversed = [...scrapes].reverse(); // prevents mutating data
  return (
    <TableStyle>
      <thead>
        <tr>
          <td>Amount</td>
          <td>Date</td>
        </tr>
      </thead>
      <tbody>
        {scrapesReversed.map(scrape => (
          <tr key={scrape.date}>
            <td>{formatCurrency(scrape.data.total)}</td>
            <td>
              {`${distanceInWords(new Date(scrape.date), new Date())} ago`}
            </td>
          </tr>
        ))}
      </tbody>
    </TableStyle>
  );
}

const TableStyle = styled.table`
  font-size: 18px;
  width: 320px;
  td {
    width: 140px;
    padding: 4px 8px;
  }
  thead {
    td {
      font-weight: 600;
      text-decoration: underline;
    }
  }
`;
