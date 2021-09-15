// @flow

import messagesReducer from "./index";

import type { State } from "./index";
import type { Action, Message } from "../../types";

describe(`on POST_MESSAGE_SUCCESS`, () => {
  it("Appends messages to state, resets error if any", () => {
    const initialState: State = {
      error: "Oopsie",
      items: [{ authorId: "_", body: "Hi1" }],
    };

    const action: Action = {
      type: "POST_MESSAGE_SUCCESS",
      payload: { authorId: "_", body: "Hi2" },
    };

    const expected: State = {
      error: null,
      items: [
        { authorId: "_", body: "Hi1" },
        { authorId: "_", body: "Hi2" },
      ],
    };

    expect(messagesReducer(initialState, action)).toEqual(expected);
  });
});

describe(`on POST_MESSAGE_FAILURE`, () => {
  it("Keeps previous state, sets error", () => {
    const initialState: State = {
      error: null,
      items: [{ authorId: "_", body: "Hi" }],
    };

    const action: Action = {
      type: "POST_MESSAGE_FAILURE",
      error: "Error message",
    };

    const expected = {
      error: "Error message",
      items: [{ authorId: "_", body: "Hi" }],
    };

    expect(messagesReducer(initialState, action)).toEqual(expected);
  });
});
