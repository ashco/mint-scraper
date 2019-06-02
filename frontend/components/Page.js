import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ScrapeProvider } from './ScrapeContext';

const targetIp = '192.168.86.72';
const port = 4001;
const targetUrl =
  // process.env.NODE_ENV === 'production'
  `http://${targetIp}:${port}`;
// `http://localhost:${port}`;

// Custom Hook!
function useScrapes() {
  // Initial State inside hook
  const [scrapes, setScrapes] = useState([]);
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
      <PageStyle className="page">{children}</PageStyle>
    </ScrapeProvider>
  );
}

const PageStyle = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 100px auto 70px;
`;
