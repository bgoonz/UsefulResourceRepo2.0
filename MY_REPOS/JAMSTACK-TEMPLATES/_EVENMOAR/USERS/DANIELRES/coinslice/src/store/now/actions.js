// @flow
import type { Action, NowValues } from "../../types";
import now from "./nowService";

export const fetchValues = () => (dispatch: Function) => {
  dispatch(({ type: "NOW/REQUEST" }: Action));
  now().then((payload) => dispatch(({ type: "NOW/SUCCESS", payload }: Action)));
};
