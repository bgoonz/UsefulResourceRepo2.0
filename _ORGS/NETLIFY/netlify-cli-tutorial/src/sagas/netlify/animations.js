import { call, put } from 'redux-saga/effects';
import { addHistory, updateHistory } from '../../actions/base';
import { hidePrompt } from '../../actions/prompt';

export function randomWait() {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 800 + 200);
  });
}

export function* deployAnimation() {
  yield put(hidePrompt());
  yield put(addHistory('[                                        ] Uploading'));
  for (var i = 1; i <= 5; i++) {
    yield call(randomWait);
    var progress = '[';
    for (var j = 0; j < 40; j++) {
      if (j <= 40 * i / 5) {
        progress += '=';
      } else {
        progress += ' ';
      }
    }
    progress += '] Uploading';
    yield put(updateHistory(progress));
  }
}
