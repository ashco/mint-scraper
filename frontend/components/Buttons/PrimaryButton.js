import styled from 'styled-components';

const PrimaryButtonStyle = styled.button`
  border: none;
  height: 50px;
  width: 50px;
  background: none;
  margin: 25px;
  &:hover {
    cursor: pointer;
  }
  svg {
    color: var(--bg-color);
    height: 100%;
  }
`;

export default PrimaryButtonStyle;
