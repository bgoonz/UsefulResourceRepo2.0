import React from 'react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

import { ThemeContainer, RouterContainer } from './containers'
import { store } from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeContainer>
          <RouterContainer />
        </ThemeContainer>
      </HelmetProvider>
    </Provider>
  )
}

export default App
