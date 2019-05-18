import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { distanceInWords } from 'date-fns';


export default class Chart extends PureComponent {
  render() {
    const { scrapes } = this.props;
    const scrapesWithDates = scrapes.map(scrape => ({ ...scrape, date: distanceInWords(new Date(scrape.date), new Date()) }));

    return (
      <LineChart
        width={800}
        height={600}
        data={scrapesWithDates}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        {/* <YAxis domain={['dataMin', 'dataMax']} /> */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="data.cash.total" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="data.creditCards.total" stroke="#82ca9d" />
        <Line type="monotone" dataKey="data.investments.total" stroke="#d58484" />
        <Line type="monotone" dataKey="data.loans.total" stroke="#84cdd5" /> */}
      </LineChart>
    );
  }
}
