import { all } from 'redux-saga/effects'
import fetchItemList from './itemsList'
import searchItem from './itemsList'

export default function* itemSagas() {
  yield all([fetchItemList(), searchItem()])
}
