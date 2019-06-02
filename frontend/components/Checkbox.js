import styled from 'styled-components';

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  /* // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually */
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: ${props => props.size || '16'}px;
  height: ${props => props.size || '16'}px;
  background: ${props => (props.checked ? props.color : '#dcdcdc')};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${props => props.color};
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
  span {
    margin-top: 4px;
  }
`;

const Checkbox = ({ title, name, color, checked, ...props }) => (
  <CheckboxContainer>
    <label>
      <HiddenCheckbox name={name} checked={checked} {...props} />
      <StyledCheckbox checked={checked} color={color} size="24">
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
      <span>{title}</span>
    </label>
  </CheckboxContainer>
);

export default Checkbox;
