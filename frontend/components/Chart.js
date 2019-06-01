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

    console.log(scrapesWithDates);

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
            <stop offset="5%" stopColor="#222" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#222" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--mint-color)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--mint-color)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCreditCard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--red-color)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--red-color)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--orange-color)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--orange-color)"
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="colorInvestments" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--blue-color)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--blue-color)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProperty" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--purple-color)"
              stopOpacity={0.8}
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
          fillOpacity={0.2}
          stroke="#222"
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

        {/* {accounts.creditCard && (
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
        /> */}
      </AreaChart>
      // <LineChart
      //   data={scrapesWithDates}
      //   height={600}
      //   width={800}
      //   margin={{
      //     top: 5,
      //     right: 30,
      //     left: 30,
      //     bottom: 5,
      //   }}
      // >
      //   <CartesianGrid strokeDasharray="5 5" />
      //   <XAxis dataKey="date" />
      //   <YAxis
      //     tickFormatter={(value, name, props) => [formatCurrency(value)]}
      //     width={90}
      //     domain={[
      //       dataMin => {
      //         console.log({ dataMin });
      //         return dataMin - Math.abs(dataMin) * 0.1;
      //       },
      //       dataMax => {
      //         console.log({ dataMax });
      //         return dataMax + Math.abs(dataMax) * 0.1;
      //       },
      //       // 'auto',
      //       // 'auto',
      //     ]}
      //     allowDataOverflow
      //   />
      //   <Tooltip
      //     formatter={(value, name, props) => [formatCurrency(value), name]}
      //   />
      //   {accounts.cash && (
      //     <Line
      //       type="monotone"
      //       dataKey="totalCash"
      //       stackId="1"
      //       stroke="var(--mint-color)"
      //       // fill="var(--mint-color)"
      //       activeDot={{ r: 8 }}
      //     />
      //   )}
      //   {accounts.creditCard && (
      //     <Line
      //       type="monotone"
      //       dataKey="totalCreditCard"
      //       stackId="1"
      //       stroke="var(--red-color)"
      //       // fill="var(--red-color)"
      //       activeDot={{ r: 8 }}
      //     />
      //   )}
      //   {accounts.loans && (
      //     <Line
      //       type="monotone"
      //       dataKey="totalLoans"
      //       stackId="1"
      //       stroke="var(--orange-color)"
      //       // fill="var(--orange-color)"
      //       activeDot={{ r: 8 }}
      //     />
      //   )}
      //   {accounts.investments && (
      //     <Line
      //       type="monotone"
      //       dataKey="totalInvestments"
      //       stackId="1"
      //       stroke="var(--blue-color)"
      //       // fill="var(--blue-color)"
      //       activeDot={{ r: 8 }}
      //     />
      //   )}
      //   {accounts.property && (
      //     <Line
      //       type="monotone"
      //       dataKey="totalProperty"
      //       stackId="1"
      //       stroke="var(--purple-color)"
      //       // fill="var(--purple-color)"
      //       activeDot={{ r: 8 }}
      //     />
      //   )}
      //   <Line
      //     type="monotone"
      //     dataKey="totalNetWorth"
      //     stackId="1"
      //     stroke="#000"
      //     // fill="var(--purple-color)"
      //     activeDot={{ r: 8 }}
      //   />
      // </LineChart>
    );
  }
}
