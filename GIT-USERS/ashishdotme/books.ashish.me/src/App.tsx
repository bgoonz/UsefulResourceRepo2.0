import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Switch, Route } from 'react-router-dom'
import history from './core/history'
import Navbar from 'ashishdotme-ui/components/navbar'
import Footer from 'ashishdotme-ui/components/footer'
import allReducers from './core/reducers'
import ItemList from './containers/ItemsList/itemsList'
import NotFound from './containers/notFound/notFound'
import itemSagas from './core/sagas'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.scss'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(itemSagas)

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Navbar />
          <Router history={history}>
            <Switch>
              <Route path='/page/:id' component={ItemList} />
              <Route exact path='/' component={ItemList} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
          <Footer />
        </Provider>
      </div>
    )
  }
}

export default App
