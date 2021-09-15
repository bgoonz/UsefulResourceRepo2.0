import React from 'react'
import { Provider } from 'unstated'

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>
}
