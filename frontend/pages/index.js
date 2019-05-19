﻿import Page from '../components/Page';
import Data from '../components/Data';
import AuthButton from '../components/AuthButton';

export default function Home() {
  return (
    <Page>
      <h2>Wealth Tracker</h2>
      <AuthButton />
      <Data />
    </Page>
  );
}
