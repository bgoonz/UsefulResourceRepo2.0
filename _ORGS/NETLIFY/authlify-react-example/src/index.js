import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { auth } from './reducers/auth'
import App from './containers/App';
import Index from './containers/Index';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Amnesia from './containers/Amnesia';

const store = createStore(
  combineReducers({
    auth,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/amnesia" component={Amnesia}/>
        <Route path="/users/confirm/:code" component={Signup}/>
        <Route path="/users/recover/:code" component={Amnesia}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
