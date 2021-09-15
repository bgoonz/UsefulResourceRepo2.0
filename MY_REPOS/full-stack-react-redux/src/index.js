import React from 'react'
import { hydrate, render } from 'react-dom'

import * as serviceWorker from './serviceWorker'
import App from './App'

const rootElement = document.getElementById('root')

if (process.env.NODE_ENV === 'development') {
  // Perform hot reload only in development
  const hotRender = (Component) => {
    return render(<Component />, rootElement)
  }
  hotRender(App)
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default
      hotRender(NextApp)
    })
  }
} else {
  // Perform snapshot in non-development
  if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement)
  } else {
    render(<App />, rootElement)
  }
}

serviceWorker.unregister()
