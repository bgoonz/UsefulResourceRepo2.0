// @flow
import { connect } from "react-redux";
import { groupBy } from "lodash";
import * as React from "react";

import { fetchValues } from "./store/now/actions";

import PortfolioForm from "./PortfolioForm";
import "./App.css";

import type { NowValues } from "./types";

const originalEntries = [
  {
    coin: "BTC",
    date: "2017-11-23 22:06:04",
    amount: 1,
    price: 1000.0001,
  },
  {
    coin: "ETH",
    date: "2017-07-18 10:46:03",
    amount: 1.00000001,
    price: 100.259,
  },
  {
    coin: "ETH",
    date: "2017-11-23 22:06:04",
    amount: 0.5,
    price: 320.0001,
  },
];

const entries = groupBy(originalEntries, (e) => e.coin);
const coins = Object.keys(entries);

const history = [{ date: "2017-11-27 22:12:00", BTC: 8129.9, ETH: 401.05 }];

const headers = (coin) => [coin, "€", "amount", "price"];

const paid = (line) => line.price * line.amount;
const cur_value = (line, now): number => now[line.coin] * line.amount;
const gain = (line, now): number => cur_value(line, now) - paid(line);

type Props = { now: NowValues };

class App extends React.Component<Props> {
  render() {
    const { now } = this.props;

    return (
      <div className="App">
        <div className="now">
          {Object.entries(now).map(([k, v]: any, i) => (
            <span key={k}>
              <b>{k}</b>: {v}
            </span>
          ))}
        </div>

        <PortfolioForm />

        {coins.map((coin) => (
          <table className="table entries" key={coin}>
            <thead>
              <tr>
                <th className="coin">{coin}</th>
                <th className="date">date</th>
                <th className="amount">amount</th>
                <th className="price">price</th>
                <th className="paid">paid</th>
                <th className="cur_value">current</th>
                <th className="gain">gain</th>
              </tr>
            </thead>
            <tbody>
              {entries[coin].map((line, i) => (
                <tr key={i}>
                  <td className="coin" />
                  <td className="date">{line.date}</td>
                  <td className="amount">{line.amount}</td>
                  <td className="price">{line.price}</td>
                  <td className="paid">{paid(line)}</td>
                  <td className="cur_value">{cur_value(line, now)}</td>
                  <td className="gain">{gain(line, now)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}

export default connect(
  ({ now }) => ({ now }),
  (dispatch) => ({ _init: dispatch(fetchValues()) })
)(App);
