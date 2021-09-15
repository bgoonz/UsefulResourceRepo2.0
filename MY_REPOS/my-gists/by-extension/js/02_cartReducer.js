import { createReducer } from 'redux-create-reducer'
import * as types from '../constants/ActionTypes'

import indexedListReducerGenerator, { LIST_UPSERT, LIST_DELETE } from './indexedListReducerGenerator'

const initialState = {
  items: { byId: {}, ids: [] }
}

const quantityCounter = createReducer(0, {
  [types.CART_ADD_ITEM](state, action) { return 1 },
  [types.CART_REMOVE_ITEM](state, action) { return 0 },
  [types.CART_INC_ITEM_QUANTITY](state, action) { return state + 1 },
  [types.CART_DEC_ITEM_QUANTITY](state, action) { return Math.max(state - 1, 0) },
})

function cartEntry(state={ quantity: 0 }, action) {
  switch (action.type) {
    case types.CART_ADD_ITEM:
    case types.CART_REMOVE_ITEM:
    case types.CART_INC_ITEM_QUANTITY:
    case types.CART_DEC_ITEM_QUANTITY:
      return {
        ...state,
        quantity: quantityCounter(state.quantity, action)
      }

    default:
      return state
  }
}

const itemsByIdReducer = indexedListReducerGenerator(cartEntry)

export default function cartReducer(state=initialState, action) {
  let listActionType

  switch (action.type) {
    case types.CART_ADD_ITEM:
    case types.CART_INC_ITEM_QUANTITY:
    case types.CART_DEC_ITEM_QUANTITY:
      listActionType = LIST_UPSERT
      break

    case types.CART_REMOVE_ITEM:
      listActionType = LIST_DELETE
      break

    default:
      return state
  }

  return {
    ...state,
    items: itemsByIdReducer(state.items, { type: listActionType, id: action.item.id, innerAction: action } ),
  }
}
