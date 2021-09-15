// @flow
import type { Action, PortfolioFormEntry } from "../../types";

export type State = { errors: {}, data: PortfolioFormEntry };

export const initialState = { errors: {}, data: {} };

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "PORTFOLIO_FORM/UPDATE":
      return { ...state, data: { ...state.data, ...action.payload } };
    case "PORTFOLIO_FORM/RESET":
      return { ...initialState };
    case "PORTFOLIO_FORM/SET_ERRORS":
      return { ...state, errors: { ...action.errors } };
    default:
      return state;
  }
};
