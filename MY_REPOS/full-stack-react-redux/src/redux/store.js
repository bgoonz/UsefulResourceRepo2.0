import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import { loadState, saveState } from '../utils/webStorage'

/**
 * Import the combined reducer that contains
 * router reducer (connected-react-router) and custom made reducers
 */

import createRootReducer from './reducers'

/**
 * Setup array of Redux middlewares
 * Only use logger in development
 */

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}

/**
 * Configure store with browser history
 * So that both Redux and React Router can sync the history
 * Then history.method() is actionable in Redux actions and thunks
 */

export const history = createBrowserHistory()

export const store = createStore(
  createRootReducer(history), // root reducer with router state
  loadState(), // initial state from browser storage
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history), // reducer for changing router in store
      ...middlewares // the other middlewares
    )
  )
)

store.subscribe(() => saveState(store.getState()))
