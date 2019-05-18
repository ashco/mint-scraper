import React, { useContext } from 'react';

import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';


export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);
  return (
    <div>
      <h2>Dem Charts!</h2>
      <Chart title="Cash" color="#82ca9d" scrapes={scrapes.cashData} />
      <Chart title="Credit Card" color="#e59246" scrapes={scrapes.creditCardData} />
      <Chart title="Loans" color="#d58484" scrapes={scrapes.loanData} />
      <Chart title="Investments" color="#84cdd5" scrapes={scrapes.investmentData} />
      <Chart title="Property" color="#8884d8" scrapes={scrapes.propertyData} />
      <h2>Total History Data:</h2>
      <Table title="Cash" scrapes={scrapes.cashData} />
      <Table title="Credit Card" scrapes={scrapes.creditCardData} />
      <Table title="Loans" scrapes={scrapes.loanData} />
      <Table title="Investments" scrapes={scrapes.investmentData} />
      <Table title="Property" scrapes={scrapes.propertyData} />
      <ul />
    </div>
  );
}
