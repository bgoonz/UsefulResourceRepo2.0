import { take, put, select } from 'redux-saga/effects';
import { addHistory } from '../actions/base';
import { showHelp } from '../actions/help';
import { helpTexts, notFound } from './netlify/help';
import { getNetlifyCmd, getHelpSeen, getPlayback } from './selectors';
import { deploy } from './netlify/deploy';
import { update } from './netlify/update';
import { open } from './netlify/open';

export default function* netlifySaga() {
  while (true) {
    const action = yield take('NETLIFY');

    const playback = yield select(getPlayback);
    if (playback) { continue; }

    const installed = yield select(getNetlifyCmd);

    if (!installed) {
      yield put(notFound());
      continue;
    }

    if (action.payload.length === 0) {
      yield put(addHistory(helpTexts.usage));
      yield put(showHelp());
      continue;
    }

    if (action.payload[1] === '--help') {
      return yield put(addHistory(helpTexts(action.payload[0])));
    }

    switch (action.payload[0]) {
      case 'deploy':
        yield deploy();
        break;
      case 'update':
        yield update(action.payload.slice(1));
        break;
      case 'open':
        yield open();
        break;
      default:
        yield put(addHistory(helpTexts.usage));
        break;
    }
  }
}
