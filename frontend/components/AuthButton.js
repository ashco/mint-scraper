/* eslint-disable class-methods-use-this */
import React from 'react';

export default class AuthButton extends React.Component {
  async handleClick() {
    // Kick off auth process, trigger sms to send
    fetch('http://localhost:5555/auth-req', {
      method: 'POST',
    })
      .catch((err) => {
        console.log('THE ERROR YO');
        alert(err);
      });
    // collect sms
    const authCode = prompt('Please provide the 6-digit authentication code.');
    // send code for auth
    await fetch('http://localhost:5555/auth-send', {
      method: 'POST',
      body: JSON.stringify({ authCode }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <button onClick={this.handleClick}>Authenticate!</button>
    );
  }
}
