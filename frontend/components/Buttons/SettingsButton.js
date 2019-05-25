/* eslint-disable class-methods-use-this */
import React from 'react';
import styled from 'styled-components';
import PrimaryButtonStyle from './PrimaryButton';
import SettingsIcon from '../Icons/Settings';

export default class SettingsButton extends React.Component {
  handleClick() {}

  render() {
    return (
      <SettingsButtonStyle
        title="Settings"
        type="button"
        onClick={this.handleClick}
      >
        <SettingsIcon />
      </SettingsButtonStyle>
    );
  }
}

const SettingsButtonStyle = styled(PrimaryButtonStyle)`
  height: 40px;
  width: 40px;
  margin: 15px 25px;
`;
