// @flow
import type {
  Action,
  PortfolioFormEntry,
  PortfolioFormErrors,
} from "../../types";

export const updateForm =
  (formEntry: PortfolioFormEntry) => (dispatch: Function) =>
    dispatch(({ type: "PORTFOLIO_FORM/UPDATE", payload: formEntry }: Action));

export const resetForm = () => (dispatch: Function) =>
  dispatch(({ type: "PORTFOLIO_FORM/RESET" }: Action));

export const setErrors =
  (errors: PortfolioFormErrors) => (dispatch: Function) =>
    dispatch(({ type: "PORTFOLIO_FORM/SET_ERRORS", errors }: Action));
