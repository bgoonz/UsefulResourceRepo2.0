import React from 'react'
import { Subscribe } from 'unstated'
import CounterContainer from '../state/CounterContainer'

const Counter = () => (
  <Subscribe to={[CounterContainer]}>
    {counter => (
      <div
        style={{
          margin: '20px 0 0 0',
          padding: '10px 15px',
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <button onClick={() => counter.decrement()}>-</button>
        <span>Count: {counter.state.count}</span>
        <button onClick={() => counter.increment()}>+</button>
      </div>
    )}
  </Subscribe>
)

export default Counter
