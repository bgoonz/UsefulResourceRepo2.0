import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Term from './components/term';
import configureStore from './store/configure';
import { setConfig } from './actions/config';
import 'file?name=index.html!../public/index.html';
import './stylesheets/main.css';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const store = configureStore();

store.dispatch(setConfig({
  session: guid(),
  logger: window.TUTORIAL_LOG_ENDPOINT
}));

function termProvider(maxHeight, autoFocus) {
  return <Provider store={store}>
    <Term maxHeight={maxHeight} autoFocus={autoFocus}/>
  </Provider>;
}

if (window.$) {
  window.$('.js-terminal').each(
    (_, el) => {
      const jElement = window.$(el);
      const autoFocus = jElement.data('auto-focus') !== undefined ? jElement.data('auto-focus') : true;
      const maxWidth = jElement.data('max-height') || 600;

      render(termProvider(maxWidth, autoFocus), el);
    }
  );
} else {
  render(termProvider(600, true), document.getElementById('root'));
}
