import React from 'react';
import { distanceInWords } from 'date-fns';


export default function Table({ scrapes, title }) {
  // const scrapesReversed = [...scrapes].reverse(); // prevents mutating data
  return (
    <table>
      <thead>
        <tr>
          <td>{title}</td>
          <td>Date</td>
        </tr>
      </thead>
      <tbody>
        {scrapes.map(scrape => (
          <tr key={scrape.date}>
            <td>{scrape.data.total}</td>
            <td>{distanceInWords(new Date(scrape.date), new Date())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
