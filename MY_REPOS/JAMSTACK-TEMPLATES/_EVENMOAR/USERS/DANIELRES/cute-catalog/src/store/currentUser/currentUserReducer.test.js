import reducer, { initialState } from "./currentUserReducer";
import * as types from "store/types";

describe(`on ${types.CURRENT_USER_LOGGED_OUT}`, () => {
  it("resets the currentUser", () => {
    const state = { email: "john@example.com" };

    const action = { type: types.CURRENT_USER_LOGGED_OUT };

    const expected = initialState;
    expect(reducer(state, action)).toEqual(expected);
  });
});

describe(`on ${types.FETCH_CURRENT_USER_FAILURE}`, () => {
  it("preserves state, sets error, sets isLoading to false", () => {
    const state = { a: "a", isLoading: true };

    const action = {
      error: "some error",
      type: types.FETCH_CURRENT_USER_FAILURE,
    };

    const expected = {
      a: "a",
      error: "some error",
      isLoading: false,
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});

describe(`on ${types.FETCH_CURRENT_USER_REQUEST}`, () => {
  it("preserves state, sets isLoading to true", () => {
    const state = { a: "a", isLoading: false };

    const action = {
      type: types.FETCH_CURRENT_USER_REQUEST,
    };

    const expected = {
      a: "a",
      isLoading: true,
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});

describe(`on ${types.FETCH_CURRENT_USER_SUCCESS}`, () => {
  it("sets the current user nullifies error, sets isLoading to false, sets isLoggedIn to true", () => {
    const state = {
      a: "a",
      error: "some error",
      isLoading: true,
      isLoggedIn: false,
    };

    const action = {
      type: types.FETCH_CURRENT_USER_SUCCESS,
      payload: {
        currentUser: {
          email: "john@example.com",
        },
      },
    };

    const expected = {
      a: "a",
      currentUser: {
        email: "john@example.com",
      },
      error: null,
      isLoading: false,
      isLoggedIn: true,
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});
