import styled from 'styled-components';

import SettingsButton from './Buttons/SettingsButton';
import TimestampText from './TimestampText';

const Footer = () => (
  <FooterStyle>
    <TimestampText />
    {/* <SettingsButton /> */}
  </FooterStyle>
);

const FooterStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--mint-color);
`;

export default Footer;
