/* eslint-disable class-methods-use-this */
import React from 'react';

const targetIp = '192.168.86.72';
const port = 4001;
const targetUrl =
  process.env.NODE_ENV === 'production'
    ? `http://${targetIp}:${port}`
    : `http://localhost:${port}`;

export default class ScrapeButton extends React.Component {
  async handleClick() {
    const res = await fetch(`${targetUrl}/scrape`);
    const message = await res.text();

    alert(message);
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Scrape!
      </button>
    );
  }
}
