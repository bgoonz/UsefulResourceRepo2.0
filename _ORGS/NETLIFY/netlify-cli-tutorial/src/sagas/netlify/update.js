import { select, put } from 'redux-saga/effects';
import { addHistory } from '../../actions/base';
import { getConf } from '../selectors';
//import { authenticate } from './authentication';
import { noConfig } from './help';

export function* update(args) {
  const conf = yield select(getConf);
  if (!conf) { return yield put(noConfig); }
  //const api = yield authenticate();

  yield put(addHistory(
    '',
    '__Sadly this is as far as the netlify tutorial goes at this point__',
    '__To continue your journey, install the real CLI from your terminal__',
    '__Or visit [[https://app.netlify.com]] to login to the Web UI and view your new site there__',
    ''
  ));
}
