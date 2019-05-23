import styled from 'styled-components';

import SettingsButton from './Buttons/SettingsButton';

const Footer = () => (
  <FooterStyle>
    <SettingsButton />
  </FooterStyle>
);

const FooterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--header-bg-color);
  height: 100px;
`;

export default Footer;
