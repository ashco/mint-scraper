import React, { PureComponent } from 'react';
import {
  LineChart,
  ResponsiveContainer,
  AreaChart,
  Line,
  Area,
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
          domain={[
            // dataMin => dataMin - Math.abs(dataMin) * 0.1,
            // dataMax => dataMax + Math.abs(dataMax) * 0.1,
            'auto',
            'auto',
          ]}
        />
        <Tooltip
          formatter={(value, name, props) => [formatCurrency(value), name]}
        />
        {accounts.cash && (
          <Line
            type="monotone"
            dataKey="totalCash"
            stackId="1"
            stroke="var(--mint-color)"
            // fill="var(--mint-color)"
            activeDot={{ r: 8 }}
          />
        )}
        {accounts.creditCard && (
          <Line
            type="monotone"
            dataKey="totalCreditCard"
            stackId="1"
            stroke="var(--red-color)"
            // fill="var(--red-color)"
            activeDot={{ r: 8 }}
          />
        )}
        {accounts.loans && (
          <Line
            type="monotone"
            dataKey="totalLoans"
            stackId="1"
            stroke="var(--orange-color)"
            // fill="var(--orange-color)"
            activeDot={{ r: 8 }}
          />
        )}
        {accounts.investments && (
          <Line
            type="monotone"
            dataKey="totalInvestments"
            stackId="1"
            stroke="var(--blue-color)"
            // fill="var(--blue-color)"
            activeDot={{ r: 8 }}
          />
        )}
        {accounts.property && (
          <Line
            type="monotone"
            dataKey="totalProperty"
            stackId="1"
            stroke="var(--purple-color)"
            // fill="var(--purple-color)"
            activeDot={{ r: 8 }}
          />
        )}
        <Line
          type="monotone"
          dataKey="totalNetWorth"
          stackId="1"
          stroke="#000"
          // fill="var(--purple-color)"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
