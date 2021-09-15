import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, ColorModeProvider } from '@xstyled/emotion'

import { GlobalStyleContainer } from '../containers'
import theme from '../data/theme.json'

const ThemeContainer = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyleContainer />
      <ColorModeProvider>{children}</ColorModeProvider>
    </ThemeProvider>
  )
}

ThemeContainer.propTypes = {
  children: PropTypes.any.isRequired
}

export default ThemeContainer
