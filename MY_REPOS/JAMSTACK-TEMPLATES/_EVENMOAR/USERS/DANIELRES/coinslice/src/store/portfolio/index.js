// @flow
import type { Action, PortfolioEntry } from "../../types";

const initialState: Array<PortfolioEntry> = [];

export default (
  state: Array<PortfolioEntry> = initialState,
  action: Action
): Array<PortfolioEntry> => {
  switch (action.type) {
    case "PORTFOLIO/ADD_ENTRY":
      const newId =
        state.map((e) => e.id).reduce((a, v) => (a > v ? a : v), 1) + 1;
      return [...state, { ...action.payload, id: newId }];
    case "PORTFOLIO/REMOVE_ENTRY":
      const { id } = action;
      return [...state.filter((e) => e.id !== id)];
    default:
      return state;
  }
};
