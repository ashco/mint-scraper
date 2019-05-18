﻿import { useEffect, useState } from 'react';

import { ScrapeProvider } from './ScrapeContext';

// Custom Hook!
function useScrapes() {
  // Initial State inside hook
  const [scrapes, setScrapes] = useState({
    accountData: [],
  });
  // fetch function
  async function fetchScrapes() {
    const res = await fetch('http://localhost:5555/data');
    const data = await res.json();
    console.log('working', data);
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
