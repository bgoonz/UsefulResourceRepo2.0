import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { logMiddleware } from '../middleware/logger';
import { cmd } from '../reducers/cmd';
import { cmds } from '../reducers/cmds';
import { cwd } from '../reducers/cwd';
import { files } from '../reducers/files';
import { history } from '../reducers/history';
import { help } from '../reducers/help';
import { npm } from '../reducers/npm';
import { prompt } from '../reducers/prompt';
import { config } from '../reducers/config';
import netlifySaga from '../sagas/netlify';
import jekyllSaga from '../sagas/jekyll';

const reducer = combineReducers({
  cmd,
  cmds,
  cwd,
  files,
  history,
  help,
  npm,
  prompt,
  config
});

const sagaMiddleware = createSagaMiddleware(netlifySaga, jekyllSaga);
const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware, sagaMiddleware, logMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default (initialState) => (
  createStoreWithMiddleware(reducer, initialState)
);
