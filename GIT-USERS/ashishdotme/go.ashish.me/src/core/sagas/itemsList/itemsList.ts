import { call, put } from 'redux-saga/effects'
import ItemsListApi from '../../api/itemsList'
import * as actions from '../../action/itemsList'

export function* fetchItemsList() {
  try {
    const response = yield call(ItemsListApi)
    yield put(actions.fetchItemListSuccess(response))
  } catch (error) {
    yield put(actions.fetchItemListFailure(error))
  }
}
