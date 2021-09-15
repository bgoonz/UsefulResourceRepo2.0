import reducer from "./productsReducer";
import * as types from "store/types";

describe(`on ${types.FETCH_PRODUCTS_SUCCESS}`, () => {
  it("updates the products list", () => {
    const state = {
      items: {
        1: { id: 1, title: "one" },
        2: { id: 2, title: "two" },
      },
    };

    const action = {
      type: types.FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: [
          {
            id: 2,
            title: "two(new)",
          },
          { id: 3, title: "three" },
        ],
      },
    };

    const expected = {
      items: {
        1: { id: 1, title: "one" },
        2: { id: 2, title: "two(new)" },
        3: { id: 3, title: "three" },
      },
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});

describe(`on ${types.FETCH_PRODUCT_SUCCESS}`, () => {
  it("updates the product in the list", () => {
    const state = {
      items: {
        1: { id: 1, title: "one" },
        2: { id: 2, title: "two" },
      },
    };

    const action = {
      type: types.FETCH_PRODUCT_SUCCESS,
      payload: {
        product: {
          id: 2,
          title: "two",
          details: "details",
        },
      },
    };

    const expected = {
      items: {
        1: { id: 1, title: "one" },
        2: { id: 2, title: "two", details: "details" },
      },
    };
    expect(reducer(state, action)).toEqual(expected);
  });
});
