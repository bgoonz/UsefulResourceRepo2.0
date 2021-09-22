import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Admin from './components/admin';
import configureStore from './store/configure';
import { setConfig } from './actions/config';
import 'file?name=admin.html!../public/admin.html';
import './stylesheets/main.css';

const store = configureStore();

store.dispatch(setConfig({
  playback: true,
  logger: window.TUTORIAL_LOG_ENDPOINT
}));

const credentials = sessionStorage.getItem('credentials');
if (credentials) {
  store.dispatch(
    setConfig({credentials: JSON.parse(credentials)})
  );
}

render((
  <Provider store={store}>
    <Admin/>
  </Provider>
), document.getElementById('root'));
