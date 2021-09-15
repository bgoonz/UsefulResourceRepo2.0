import React from 'react'
import { useColorMode } from '@xstyled/emotion'

import { Toggle } from '../components'

const ColorModeToggle = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <Toggle
      colorMode={colorMode}
      onClick={() => setColorMode(colorMode === 'dark' ? 'default' : 'dark')}
    />
  )
}

export default ColorModeToggle
