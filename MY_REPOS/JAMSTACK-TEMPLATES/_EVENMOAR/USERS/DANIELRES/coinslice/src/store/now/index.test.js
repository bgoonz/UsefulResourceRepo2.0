// @flow
import nowReducer from "./index";
import type { Action, NowValues } from "../../types";

describe(`on NOW/SUCCESS`, () => {
  it("Adds crypto values to NowValues", () => {
    const initialNowValues: NowValues = {};

    const action: Action = {
      type: "NOW/SUCCESS",
      payload: { BTC: 1, ETH: 2 },
    };

    const expected: NowValues = { BTC: 1, ETH: 2 };

    expect(nowReducer(initialNowValues, action)).toEqual(expected);
  });
});

describe(`on NOW/FAILURE`, () => {
  it("Empties state", () => {
    const initialNowValues: NowValues = {
      ETH: 1,
    };

    const action: Action = {
      type: "NOW/FAILURE",
      error: "Error message",
    };

    const expected = {};

    expect(nowReducer(initialNowValues, action)).toEqual(expected);
  });
});
