import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { ScrapeContext } from './ScrapeContext';
import Checkbox from './Checkbox';
import Table from './Table';

import Chart from './Chart';
// import OverviewChart from './OverviewChart';
import DataButton from './Buttons/DataButton';

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);

  const [selectedData, setSelectedData] = useState({
    cash: true,
    creditCard: true,
    loans: true,
    investments: true,
    property: true,
  });

  const handleToggle = e => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.checked });
  };
  // const cashObj = {
  //   data: 'cash',
  //   title: 'Cash',
  //   color: 'var(--mint-color)',
  // };
  // const creditCardObj = {
  //   // data: scrapes.totalCreditCard,
  //   title: 'Credit Card',
  //   color: 'var(--red-color)',
  // };
  // const loanObj = {
  //   // data: scrapes.totalLoans,
  //   title: 'Loans',
  //   color: 'var(--orange-color)',
  // };
  // const investmentObj = {
  //   // data: scrapes.totalInvestments,
  //   title: 'Investments',
  //   color: 'var(--blue-color)',
  // };
  // const propertyObj = {
  //   // data: scrapes.totalProperty,
  //   title: 'Property',
  //   color: 'var(--purple-color)',
  // };

  // const [targetData, setTargetData] = useState(cashObj);

  useEffect(() => {
    console.log(selectedData);
  });

  return (
    <DataWrapper>
      <CheckboxWrapper>
        <Checkbox
          name="cash"
          color="var(--mint-color)"
          checked={selectedData.cash}
          onChange={handleToggle}
        />
        <Checkbox
          name="creditCard"
          color="var(--red-color)"
          checked={selectedData.creditCard}
          onChange={handleToggle}
        />
        <Checkbox
          name="loans"
          color="var(--orange-color)"
          checked={selectedData.loans}
          onChange={handleToggle}
        />
        <Checkbox
          name="investments"
          color="var(--blue-color)"
          checked={selectedData.investments}
          onChange={handleToggle}
        />
        <Checkbox
          name="property"
          color="var(--purple-color)"
          checked={selectedData.property}
          onChange={handleToggle}
        />
      </CheckboxWrapper>

      <div>
        {/* <OverviewChart scrapes={scrapes} /> */}
        {/* <Chart
          title={targetData.title}
          color={targetData.color}
          data={targetData.data}
        /> */}
      </div>
      <TableWrapper>
        {/* <Table title={targetData.title} scrapes={targetData.data} /> */}
      </TableWrapper>
    </DataWrapper>
  );
}

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CheckboxWrapper = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const TableWrapper = styled.div`
  margin: 20px auto 40px;
`;
