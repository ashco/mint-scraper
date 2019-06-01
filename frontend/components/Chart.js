import React, { PureComponent } from 'react';
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { distanceInWords } from 'date-fns';
import formatCurrency from '../libs/formatCurrency';

export default class Chart extends PureComponent {
  render() {
    const { scrapes, accounts } = this.props;
    const scrapesWithDates = scrapes.map(scrape => ({
      ...scrape,
      date: distanceInWords(new Date(scrape.date), new Date()),
    }));

    // console.log(scrapesWithDates);
    // return 'working on it';
    return (
      <LineChart
        data={scrapesWithDates}
        height={600}
        width={800}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={(value, name, props) => [formatCurrency(value)]}
          width={90}
        />
        <Tooltip formatter={(value, name, props) => [formatCurrency(value)]} />
        <Line
          type="monotone"
          dataKey="totalCash"
          // stroke={color}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
