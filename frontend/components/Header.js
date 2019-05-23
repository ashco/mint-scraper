import styled from 'styled-components';

import AuthButton from './Buttons/AuthButton';
import ScrapeButton from './Buttons/ScrapeButton';

const Header = () => (
  <HeaderStyle>
    <ScrapeButton />
    <TitleStyle>Mint Scraper</TitleStyle>
    <AuthButton />
  </HeaderStyle>
);

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--header-bg-color);
  height: 100px;
`;

const TitleStyle = styled.h1`
  font-size: 36px;
  font-weight: 300;
  color: var(--header-text-color);
`;

export default Header;
