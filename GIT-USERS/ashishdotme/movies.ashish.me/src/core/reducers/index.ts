import { combineReducers } from 'redux'
import ItemsListData from './itemsList'
import { ItemsListState } from './itemsList'

export interface ItemState {
  fetchItemsList: ItemsListState
}

export default combineReducers({
  fetchItemsList: ItemsListData,
})
