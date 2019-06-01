import React from 'react';
import styled from 'styled-components';
import { distanceInWords } from 'date-fns';
import formatCurrency from '../libs/formatCurrency';

export default function Table({ scrapes, accounts }) {
  const scrapesReversed = [...scrapes].reverse(); // prevents mutating data

  return (
    <TableStyle>
      <thead>
        <tr>
          <td>Date</td>
          {accounts.cash && <td>Cash</td>}
          {accounts.creditCard && <td>Credit Card</td>}
          {accounts.loans && <td>Loans</td>}
          {accounts.investments && <td>Investments</td>}
          {accounts.property && <td>Property</td>}
          <td>Net Worth</td>
        </tr>
      </thead>
      <tbody>
        {scrapesReversed.length > 0 &&
          scrapesReversed.map(scrape => (
            <tr key={scrape.date}>
              <td>
                {`${distanceInWords(new Date(scrape.date), new Date())} ago`}
              </td>
              {accounts.cash && <td>{formatCurrency(scrape.totalCash)}</td>}
              {accounts.creditCard && (
                <td>{formatCurrency(scrape.totalCreditCard)}</td>
              )}
              {accounts.loans && <td>{formatCurrency(scrape.totalLoans)}</td>}
              {accounts.investments && (
                <td>{formatCurrency(scrape.totalInvestments)}</td>
              )}
              {accounts.property && (
                <td>{formatCurrency(scrape.totalProperty)}</td>
              )}
              <td>{formatCurrency(scrape.totalNetWorth)}</td>
            </tr>
          ))}
      </tbody>
    </TableStyle>
  );
}

const TableStyle = styled.table`
  font-size: 18px;
  width: 360px;
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
