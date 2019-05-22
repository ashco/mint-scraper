﻿import { useEffect, useState } from 'react';

import { ScrapeProvider } from './ScrapeContext';

const targetUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://192.168.86.72:4000'
    : 'http://localhost:4000';

// Custom Hook!
function useScrapes() {
  // Initial State inside hook
  const [scrapes, setScrapes] = useState({
    cashData: [],
    creditCardData: [],
    loanData: [],
    investmentData: [],
    propertyData: [],
  });
  // fetch function
  async function fetchScrapes() {
    const res = await fetch(`${targetUrl}/data`);
    const data = await res.json();
    setScrapes(data);
  }

  // didMount/Did update
  useEffect(() => {
    fetchScrapes();
  }, []);

  return { scrapes, fetchScrapes };
}

export default function Page({ children }) {
  const hookInfo = useScrapes();
  return (
    <ScrapeProvider value={hookInfo}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
