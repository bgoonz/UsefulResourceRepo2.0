import { Reducer } from 'redux'
import * as types from '../../actionTypes/itemsList'

export type ItemsListState = {
  itemsList: []
  isLoading: boolean
  error: any
}
export const initialState: ItemsListState = {
  itemsList: [],
  isLoading: false,
  error: null,
}

const ItemsListData: Reducer<ItemsListState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_ITEM_LIST:
      return {
        ...state,
        isLoading: true,
      }
    case types.FETCH_ITEM_LIST_SUCCESS:
      return {
        ...state,
        itemsList: payload,
        isLoading: false,
      }
    case types.FETCH_ITEM_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'Something working wrong!',
      }
    default:
      return state
  }
}
export default ItemsListData
