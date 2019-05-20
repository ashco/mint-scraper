/* eslint-disable class-methods-use-this */
import React from 'react';

export default class AuthButton extends React.Component {
  async handleClick() {
    const res1 = await fetch('http://localhost:5555/auth-req', {
      method: 'POST',
    });

    if (res1.status === 250) {
      const message1 = await res1.text();
      alert(message1);
    } else {
      // collect sms
      const authCode = prompt('Please provide the 6-digit auth code.');
      // send code for auth
      const res2 = await fetch('http://localhost:5555/auth-send', {
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
      <button type="button" onClick={this.handleClick}>
        Authenticate!
      </button>
    );
  }
}
