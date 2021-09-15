import { call, put, take } from 'redux-saga/effects';
import { addHistory } from '../../actions/base';
import { setOptions, clearPrompt } from '../../actions/prompt';
import API from '../../lib/netlify-api';
import Auth from '../../lib/netlify-auth';

const auth = new Auth({site_id: 'app.netlify.com'});
function oauthAuthentication(provider) {
  return new Promise((resolve, reject) => {
    auth.authenticate({provider: provider, scope: 'user', login: true}, (err, data) => {
      if (err) { return reject(err); }
      resolve(data);
    });
  });
}

let credentials = null;
let api = null;

export function* authenticate() {
  if (credentials && api) {
    return api;
  }
  yield put(addHistory(
    '',
    '__At this point you\'ll need to authenticate to continue__',
    '__Please pick your prefered way:__',
    ''
  ));
  yield put(setOptions('netlify', [
    '1. GitHub',
    '2. BitBucket',
    '3. Email',
    '4. Skip'
  ]));
  const choiceResult = yield take('NETLIFY');
  const provider = choiceResult.payload[1].toLowerCase();
  if (provider !== 'skip') {
    credentials = yield call(oauthAuthentication, provider);
    api = new API({accessToken: credentials.user.access_token});
    yield put(addHistory(`Authenticated with ${provider}`));
  }
  yield put(clearPrompt());
  return api;
}
