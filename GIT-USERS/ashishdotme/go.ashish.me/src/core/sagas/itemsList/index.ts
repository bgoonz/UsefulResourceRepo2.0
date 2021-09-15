import { takeLatest } from 'redux-saga/effects'

import * as types from '../../actionTypes/itemsList'

import { fetchItemsList } from './itemsList'

export default function* () {
  yield takeLatest(types.FETCH_ITEM_LIST, fetchItemsList)
}
