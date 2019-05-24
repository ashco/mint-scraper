/* eslint-disable class-methods-use-this */
import React from 'react';

import PrimaryButtonStyle from './PrimaryButton';
import PhoneIcon from '../Icons/Phone';

const targetIp = '192.168.86.72';
const port = 4001;
const targetUrl =
  process.env.NODE_ENV === 'production'
    ? `http://${targetIp}:${port}`
    : `http://localhost:${port}`;

export default class AuthButton extends React.Component {
  async handleClick() {
    const res1 = await fetch(`${targetUrl}/auth-req`, {
      method: 'POST',
    });

    if (res1.status === 201) {
      const message1 = await res1.text();
      alert(message1);
    } else {
      // collect sms
      const authCode = prompt('Please provide the 6-digit auth code.');
      // send code for auth
      const res2 = await fetch(`${targetUrl}/auth-send`, {
        method: 'POST',
        body: JSON.stringify({ authCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const message2 = await res2.text();
      alert(message2);
    }
  }

  render() {
    return (
      <PrimaryButtonStyle
        type="button"
        title="Authenticate!"
        onClick={this.handleClick}
      >
        <PhoneIcon />
      </PrimaryButtonStyle>
    );
  }
}

// const AuthButtonStyle = styled(PrimaryButton)`

// `;
