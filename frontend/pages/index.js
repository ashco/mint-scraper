import Page from '../components/Page';
import Data from '../components/Data';
import AuthButton from '../components/AuthButton';
import ScrapeButton from '../components/ScrapeButton';

export default function Home() {
  return (
    <Page>
      <h2>Wealth Tracker</h2>
      <AuthButton />
      <ScrapeButton />
      <Data />
    </Page>
  );
}
