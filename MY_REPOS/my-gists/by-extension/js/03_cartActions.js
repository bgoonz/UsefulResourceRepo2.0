import * as types from '../constants/ActionTypes'

export const addItem = (item) => {
  return { type: types.CART_ADD_ITEM, item }
}

export const removeItem = (item) => {
  return { type: types.CART_REMOVE_ITEM, item }
}

export const incQuantity = (item) => {
  return { type: types.CART_INC_ITEM_QUANTITY, item }
}

export const decQuantity = (item) => {
  return { type: types.CART_DEC_ITEM_QUANTITY, item }
}
