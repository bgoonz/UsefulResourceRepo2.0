// @flow
import reducer from "./index";
import type { Action, PortfolioEntry } from "../../types";

type State = Array<PortfolioEntry>;

const entry1 = {
  id: 1,
  coin: "ETH",
  date: "2017-10-20 22:06:04",
  amount: 2,
  price: 200,
};

const entry2 = {
  id: 2,
  coin: "BTC",
  date: "2017-11-23 22:06:04",
  amount: 1,
  price: 1000.0001,
};

const newEntry = {
  coin: "BTC",
  date: "2017-11-23 22:06:04",
  amount: 5,
  price: 5000,
};

describe(`on PORTFOLIO/ADD_ENTRY`, () => {
  it("Adds entry to portfolio", () => {
    const initial: State = [entry1, entry2];
    const action: Action = { type: "PORTFOLIO/ADD_ENTRY", payload: newEntry };
    const expected: State = [entry1, entry2, { ...newEntry, id: 3 }];

    expect(reducer(initial, action)).toEqual(expected);
  });
});

describe(`on PORTFOLIO/REMOVE_ENTRY`, () => {
  it("Adds entry to portfolio", () => {
    const initial: State = [entry1, entry2];
    const action: Action = { type: "PORTFOLIO/REMOVE_ENTRY", id: 1 };
    const expected: State = [entry2];

    expect(reducer(initial, action)).toEqual(expected);
  });
});
