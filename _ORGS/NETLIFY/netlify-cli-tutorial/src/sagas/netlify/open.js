import { select, call, put } from 'redux-saga/effects';
import { addHistory } from '../../actions/base';
import { getConf } from '../selectors';
import { authenticate } from './authentication';
import { noConfig } from './help';

export function* open() {
  const conf = yield select(getConf);
  if (conf) {
    const api = yield authenticate();
    if (api) {
      const siteResponse = yield call([api, api.site], conf.site_id);
      yield call([window, window.open], siteResponse.data.admin_url);
      yield put(addHistory(`Opening [[${siteResponse.data.admin_url}]]`));
    }
  } else {
    yield put(noConfig());
  }
}
