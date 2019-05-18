import { useContext } from 'react';

import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
// import Chart from './Chart';


export default function Data() {
  const { accountData } = useContext(ScrapeContext);

  return (
    <div>
      <h2>Your Account Data:</h2>
      <Table scrapes={accountData} />
      <ul />
    </div>
  );
}
