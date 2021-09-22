// However we don't have to call ReactDOM.render(<Provider><App /></Provider>)
// if we're interested in hiding the fact that it's a Redux app.
//
// Maybe we want to be able to run multiple instances of it in the same "bigger" app
// and keep it as a complete black box, with Redux being an implementation detail.
// To hide Redux behind a React API, we can wrap it in a special component that
// initializes the store in the constructor. This way every instance will be independent.
//
// Note that this is *not* recommended for parts of the same app that share data.
// But it can be useful when the bigger app has zero access to smaller apps' internals,
// and we'd like to keep the fact that they are implemented with Redux an implementation detail.
// Each component instance will have its own store, so they won't "know" about each other.

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './App'

class Root extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducer)
  }
  
  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}