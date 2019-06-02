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
  const [accounts, setAccounts] = useState({
    cash: true,
    creditCard: true,
    loans: true,
    investments: true,
    property: true,
  });

  const handleToggle = e => {
    setAccounts({
      ...accounts,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <DataWrapper>
      <CheckboxWrapper>
        <Checkbox
          title="Cash"
          name="cash"
          color="var(--mint-color)"
          checked={accounts.cash}
          onChange={handleToggle}
        />
        <Checkbox
          title="Credit Card"
          name="creditCard"
          color="var(--red-color)"
          checked={accounts.creditCard}
          onChange={handleToggle}
        />
        <Checkbox
          title="Loans"
          name="loans"
          color="var(--orange-color)"
          checked={accounts.loans}
          onChange={handleToggle}
        />
        <Checkbox
          title="Investments"
          name="investments"
          color="var(--blue-color)"
          checked={accounts.investments}
          onChange={handleToggle}
        />
        <Checkbox
          title="Property"
          name="property"
          color="var(--purple-color)"
          checked={accounts.property}
          onChange={handleToggle}
        />
      </CheckboxWrapper>

      {scrapes.length > 0 ? (
        <div>
          <Chart scrapes={scrapes} accounts={accounts} />
          <Table scrapes={scrapes} accounts={accounts} />
        </div>
      ) : (
        <div>Get da money!</div>
      )}
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
