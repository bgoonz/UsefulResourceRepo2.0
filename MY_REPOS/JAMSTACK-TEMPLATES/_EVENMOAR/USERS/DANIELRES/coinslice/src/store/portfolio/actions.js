// @flow
import type { Action, PortfolioNewEntry } from "../../types";

export const addEntry = (newEntry: PortfolioNewEntry) => (dispatch: Function) =>
  dispatch(({ type: "PORTFOLIO/ADD_ENTRY", payload: newEntry }: Action));

export const removeEntry = (id: number) => (dispatch: Function) =>
  dispatch(({ type: "PORTFOLIO/REMOVE_ENTRY", id }: Action));
