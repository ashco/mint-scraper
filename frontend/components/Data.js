import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';
// import OverviewChart from './OverviewChart';
import DataButton from './Buttons/DataButton';

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);

  const cashObj = {
    data: 'cash',
    title: 'Cash',
    color: 'var(--mint-color)',
  };
  const creditCardObj = {
    // data: scrapes.totalCreditCard,
    title: 'Credit Card',
    color: 'var(--red-color)',
  };
  const loanObj = {
    // data: scrapes.totalLoans,
    title: 'Loans',
    color: 'var(--orange-color)',
  };
  const investmentObj = {
    // data: scrapes.totalInvestments,
    title: 'Investments',
    color: 'var(--blue-color)',
  };
  const propertyObj = {
    // data: scrapes.totalProperty,
    title: 'Property',
    color: 'var(--purple-color)',
  };

  const [targetData, setTargetData] = useState(cashObj);

  useEffect(() => {
    setTargetData(targetData);
  });

  return (
    <DataWrapper>
      <div>
        {/* <DataButton
          type="button"
          color="#333"
          primary={targetData.title === 'Overview'}
        >
          Overview
        </DataButton> */}
        <DataButton
          type="button"
          color={cashObj.color}
          primary={targetData.title === 'Cash'}
          onClick={() => setTargetData(cashObj)}
        >
          Cash
        </DataButton>
        <DataButton
          type="button"
          color={creditCardObj.color}
          primary={targetData.title === 'Credit Card'}
          onClick={() => setTargetData(creditCardObj)}
        >
          Credit Card
        </DataButton>
        <DataButton
          type="button"
          color={loanObj.color}
          primary={targetData.title === 'Loans'}
          onClick={() => setTargetData(loanObj)}
        >
          Loans
        </DataButton>
        <DataButton
          type="button"
          color={investmentObj.color}
          primary={targetData.title === 'Investments'}
          onClick={() => setTargetData(investmentObj)}
        >
          Investments
        </DataButton>
        <DataButton
          type="button"
          color={propertyObj.color}
          primary={targetData.title === 'Property'}
          onClick={() => setTargetData(propertyObj)}
        >
          Property
        </DataButton>
      </div>

      <div>
        {/* <OverviewChart scrapes={scrapes} /> */}
        {/* <Chart
          title={targetData.title}
          color={targetData.color}
          data={targetData.data}
        /> */}
      </div>
      <TableWrapper>
        <Table title={targetData.title} scrapes={targetData.data} />
      </TableWrapper>
    </DataWrapper>
  );
}

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TableWrapper = styled.div`
  margin: 20px auto 40px;
`;
