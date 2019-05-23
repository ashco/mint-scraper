import styled from 'styled-components';

import SettingsButton from './Buttons/SettingsButton';
import TimestampText from './TimestampText';

const Footer = () => (
  <FooterStyle>
    <div />
    <TimestampText />
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
