import * as api from "api";
import { FETCH_PRODUCT_SUCCESS, FETCH_PRODUCTS_SUCCESS } from "store/types";

export const fetchProduct = (id) => (dispatch) =>
  api
    .fetchProduct(id)
    .then((payload) => dispatch({ type: FETCH_PRODUCT_SUCCESS, payload }));

export const fetchProducts = () => (dispatch) =>
  api
    .fetchProducts()
    .then((payload) => dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload }));
