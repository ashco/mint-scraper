﻿import styled from 'styled-components';

import AuthButton from './Buttons/AuthButton';
import ScrapeButton from './Buttons/ScrapeButton';

const Header = () => (
  <HeaderStyle>
    <AuthButton />
    <TitleStyle>Mint Scraper</TitleStyle>
    <ScrapeButton />
  </HeaderStyle>
);

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--mint-color);
`;

const TitleStyle = styled.h1`
  font-size: 36px;
  font-weight: 300;
  color: var(--bg-color);
`;

export default Header;
