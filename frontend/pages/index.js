import Page from '../components/Page';
import Data from '../components/Data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/style.css';

export default function Home() {
  return (
    <Page>
      <Header />
      <Data />
      <Footer />
    </Page>
  );
}
