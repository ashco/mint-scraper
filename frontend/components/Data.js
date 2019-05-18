import { useContext } from 'react';

import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';


export default function Data() {
  const { scrapes, fetchScrapes } = useContext(ScrapeContext);
  // return <div>wrk</div>;
  console.log(scrapes);
  // return <p>working yo</p>;
  return (
    <div>
      {/* <Chart scrapes={scrapes} /> */}
      <h2>Your Account Data:</h2>
      {/* <Table scrapes={scrapes.cashData} /> */}
      <ul />
    </div>
  );
}
