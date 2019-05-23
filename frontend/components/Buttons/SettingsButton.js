/* eslint-disable class-methods-use-this */
import React from 'react';

import PrimaryButtonStyle from './PrimaryButton';
import SettingsIcon from '../Icons/Settings';

export default class SettingsButton extends React.Component {
  handleClick() {
    console.log('Check this out!');
  }

  render() {
    return (
      <PrimaryButtonStyle
        title="Settings"
        type="button"
        onClick={this.handleClick}
      >
        <SettingsIcon />
      </PrimaryButtonStyle>
    );
  }
}
