import styled from 'styled-components';

const TimestampText = () => {
  const timestamp = '10 minutes ago';
  return <TimestampTextStyle>{`Last scraped ${timestamp}`}</TimestampTextStyle>;
};

const TimestampTextStyle = styled.h3`
  color: var(--header-text-color);
  font-size: 18px;
  font-weight: 300;
`;

export default TimestampText;
