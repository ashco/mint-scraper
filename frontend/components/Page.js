import { useEffect, useState } from 'react';

import { ScrapeProvider } from './ScrapeContext';

// Custom Hook!
function useScrapes() {
  // Initial State inside hook
  const [scrapes, setScrapes] = useState({
    accountData: [],
  });

  useEffect(() => {
    (async () => {
      console.log('Mounting or Updating');
      const res = await fetch('http://localhost:5555/data');
      const data = await res.json();
      setScrapes(data);
    })();
  }, []);

  return scrapes;
}

export default function Page({ children }) {
  const scrapes = useScrapes();
  return (
    <ScrapeProvider value={scrapes}>
      <div className="page">{children}</div>
    </ScrapeProvider>
  );
}
