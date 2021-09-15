// @flow
import type { Action, Message } from "../../types";

export type State = { error: ?string, items: Array<Message> };

const initialState: State = {
  error: null,
  items: [],
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "POST_MESSAGE_SUCCESS":
      return {
        error: null,
        items: [...state.items, action.payload],
      };
    case "POST_MESSAGE_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
