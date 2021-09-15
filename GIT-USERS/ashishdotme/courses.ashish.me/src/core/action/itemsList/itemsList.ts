import * as types from '../../actionTypes/itemsList'

export const fetchItemList = () => ({
  type: types.FETCH_ITEM_LIST,
})

export const fetchItemListSuccess = (payload: string) => ({
  payload,
  type: types.FETCH_ITEM_LIST_SUCCESS,
})

export const fetchItemListFailure = (payload: string) => ({
  payload,
  type: types.FETCH_ITEM_LIST_FAILURE,
})
