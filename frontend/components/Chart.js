import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { distanceInWords } from 'date-fns';


export default class Chart extends PureComponent {
  render() {
    const { scrapes, color } = this.props;
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
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="data.total" stroke={color} activeDot={{ r: 8 }} />
      </LineChart>
    );
  }
}
