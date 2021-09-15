import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';

const DevTools = createDevTools(
  <LogMonitor theme='tomorrow' />
);

const Counter = ({ value, onAdd }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onAdd}>+</button>
  </div>
);

const counter = (state = 0, action) => {
  if (action.type === 'inc') {
    return state + 1
  }
  return state
}

const store = createStore(counter, DevTools.instrument())
const render = () => {
  ReactDOM.render(
    <div style={{ height: '100%' }}>
      <Counter
        value={store.getState()}
        onAdd={() => store.dispatch({ type: 'inc' })}
      />
      <DevTools store={store} />
    </div>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)