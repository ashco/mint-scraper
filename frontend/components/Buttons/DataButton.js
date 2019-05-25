import styled from 'styled-components';

const DataButton = styled.button`
  border: ${props => props.color} solid 3px;
  color: ${props => (props.primary ? 'var(--bg-color)' : props.color)};
  background: ${props => (props.primary ? props.color : 'none')};
  font-size: 20px;
  font-weight: 500;
  margin: 20px 10px;
  padding: 10px 25px;
  &:hover {
    cursor: pointer;
  }
`;

export default DataButton;
