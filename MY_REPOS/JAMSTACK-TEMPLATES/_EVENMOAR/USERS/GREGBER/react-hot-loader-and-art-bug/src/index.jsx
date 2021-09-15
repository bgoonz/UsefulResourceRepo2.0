// @flow

import { AppContainer } from 'react-hot-loader'
import VectorWidget from './VectorWidget'
import React from 'react'
import ReactDOM from 'react-dom'

const holderDiv = document.createElement('div')
document.body.appendChild(holderDiv)

ReactDOM.render(<VectorWidget />, holderDiv)
