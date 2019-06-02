import styled from 'styled-components';

const PrimaryButtonStyle = styled.button`
  border: none;
  height: 50px;
  width: 50px;
  background: none;
  margin: 25px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
  svg {
    color: var(--bg-color);
    height: 100%;
    &:active {
      color: #fff;
    }
  }
`;

export default PrimaryButtonStyle;
