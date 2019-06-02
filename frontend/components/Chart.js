import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
      <AreaChart
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
        <defs>
          <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#222" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#222" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--mint-color)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--mint-color)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCreditCard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--red-color)" stopOpacity={0} />
            <stop offset="95%" stopColor="var(--red-color)" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--orange-color)" stopOpacity={0} />
            <stop
              offset="95%"
              stopColor="var(--orange-color)"
              stopOpacity={0.6}
            />
          </linearGradient>
          <linearGradient id="colorInvestments" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--blue-color)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--blue-color)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProperty" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--purple-color)"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="var(--purple-color)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => [formatCurrency(value), name]}
        />
        <Area
          type="monotone"
          dataKey="totalNetWorth"
          fillOpacity={0.3}
          stroke="#222"
          fill="url(#colorNetWorth)"
        />
        {accounts.cash && (
          <Area
            type="monotone"
            dataKey="totalCash"
            fillOpacity={1}
            stroke="var(--mint-color)"
            fill="url(#colorCash)"
          />
        )}
        {accounts.loans && (
          <Area
            type="monotone"
            dataKey="totalLoans"
            fillOpacity={1}
            stroke="var(--orange-color)"
            fill="url(#colorLoans)"
          />
        )}
        {accounts.creditCard && (
          <Area
            type="monotone"
            dataKey="totalCreditCard"
            fillOpacity={1}
            stroke="var(--red-color)"
            fill="url(#colorCreditCard)"
          />
        )}
        {accounts.investments && (
          <Area
            type="monotone"
            dataKey="totalInvestments"
            fillOpacity={1}
            stroke="var(--blue-color)"
            fill="url(#colorInvestments)"
          />
        )}
        {accounts.property && (
          <Area
            type="monotone"
            dataKey="totalProperty"
            fillOpacity={1}
            stroke="var(--purple-color)"
            fill="url(#colorProperty)"
          />
        )}
      </AreaChart>
    );
  }
}
