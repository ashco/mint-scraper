import { distanceInWords } from 'date-fns';

export default function Table({ scrapes }) {
  const scrapesReversed = [...scrapes].reverse(); // prevents mutating data
  // console.log(scrapes);
  return (
    <table>
      <thead>
        <tr>
          <td>Total Cash</td>
          <td>Date</td>
        </tr>
      </thead>
      <tbody>
        {scrapesReversed.map(scrape => (
          <tr key={scrape.date}>
            <td>{scrape.data.cash.total}</td>
            <td>{distanceInWords(new Date(scrape.date), new Date())}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
