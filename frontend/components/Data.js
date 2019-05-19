import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';


export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);

  const cashObj = { data: scrapes.cashData, title: 'Cash', color: '#82ca9d' };
  const creditCardObj = { data: scrapes.creditCardData, title: 'Credit Card', color: '#e59246' };
  const loanObj = { data: scrapes.loanData, title: 'Loans', color: '#d58484' };
  const investmentObj = { data: scrapes.investmentData, title: 'Investments', color: '#84cdd5' };
  const propertyObj = { data: scrapes.propertyData, title: 'Property', color: '#8884d8' };

  const [target, setTarget] = useState(cashObj);

  // useEffect(() => {
  //   setTarget(target);
  // });

  return (
    <DataWrapper>
      <ButtonRow>
        <button onClick={() => setTarget(cashObj)}>Cash</button>
        <button onClick={() => setTarget(creditCardObj)}>Credit Card</button>
        <button onClick={() => setTarget(loanObj)}>Loans</button>
        <button onClick={() => setTarget(investmentObj)}>Investments</button>
        <button onClick={() => setTarget(propertyObj)}>Property</button>
      </ButtonRow>

      <div>
        {/* <h2>Chart</h2> */}
        <Chart title={target.title} color={target.color} scrapes={target.data} />
      </div>
      {/* <Chart title="Credit Card" color="#e59246" scrapes={scrapes.creditCardData} />
      <Chart title="Loans" color="#d58484" scrapes={scrapes.loanData} />
      <Chart title="Investments" color="#84cdd5" scrapes={scrapes.investmentData} />
      <Chart title="Property" color="#8884d8" scrapes={scrapes.propertyData} /> */}
      <div>
        <h2>Table</h2>
        <Table title={target.title} scrapes={target.data} />
      </div>
      {/* <Table title="Credit Card" scrapes={scrapes.creditCardData} />
      <Table title="Loans" scrapes={scrapes.loanData} />
      <Table title="Investments" scrapes={scrapes.investmentData} />
      <Table title="Property" scrapes={scrapes.propertyData} /> */}
      {/* <ul /> */}
    </DataWrapper>
  );
}

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

`;

const ButtonRow = styled.div`
  /* display: flex;
  justify-content: center; */
  button {
    margin: 1rem;
    padding: 0.75rem 3rem;
  }
`;
