import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import configureStore from './store';
import { fetchFruits } from './actions/fruitActions';
import { fetchFarmers } from './actions/farmersActions';

const store = configureStore();
store.dispatch(fetchFruits());
store.dispatch(fetchFarmers());

window.store = store;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
