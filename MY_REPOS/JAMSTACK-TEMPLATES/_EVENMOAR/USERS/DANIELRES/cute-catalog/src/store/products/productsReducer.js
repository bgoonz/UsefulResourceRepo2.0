import { FETCH_PRODUCT_SUCCESS, FETCH_PRODUCTS_SUCCESS } from "../types";

const initialState = {
  items: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCT_SUCCESS:
      const { product } = payload;
      return {
        ...state,
        items: { ...state.items, [product.id]: product },
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          ...payload.products.reduce(
            (acc, product) => ({ ...acc, [product.id]: product }),
            {}
          ),
        },
      };

    default:
      return state;
  }
};
