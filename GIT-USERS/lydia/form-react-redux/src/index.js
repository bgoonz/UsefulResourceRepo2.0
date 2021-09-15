import React from 'react';
import ReactDOM from 'react-dom';
//makes sure that react works with redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './index.css';
import Form from './containers/Form';
import formReducer from './containers/Form/reducer';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  form: formReducer,
})


const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <Form />
  </Provider>
),
 document.getElementById('root'));
registerServiceWorker();
