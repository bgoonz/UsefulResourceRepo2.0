import { take, put, select } from 'redux-saga/effects';
import { addHistory } from '../actions/base';
import { helpSeen } from '../actions/help';
import { getCwd, getHelpSeen, getPlayback } from './selectors';
import { helpTexts } from './jekyll/help';
import { build } from './jekyll/build';

export default function* jekyllSaga() {
  while (true) {
    const action = yield take('JEKYLL');

    const playback = yield select(getPlayback);
    if (playback) { continue; }

    const cwd    = yield select(getCwd);

    if (cwd !== '/jekyll-site') {
      yield put(addHistory(helpTexts.wrongFolder));
      continue;
    }

    if (action.payload.length === 0 || action.payload.length === 1 && action.payload[0] === 'help') {
      yield put(addHistory(helpTexts.usage));
      const seen = yield select(getHelpSeen);
      if (!seen.jekyll) {
        yield put(addHistory(helpTexts.buildWithJekyll));
        yield put(helpSeen('jekyll'));
      }
      continue;
    }

    switch (action.payload[0]) {
      case 'b':
      case 'build':
        yield build();
        break;
      case 's':
      case 'serve':
      case 'server':
        yield put(addHistory(helpTexts.wontServe));
        break;
      default:
        yield put(addHistory(helpTexts.usage));
    }
  }
}
