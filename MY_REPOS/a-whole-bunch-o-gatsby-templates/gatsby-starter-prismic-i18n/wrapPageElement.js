/* eslint react/prop-types: 0, react/display-name: 0 */
import React from 'react'

import { Layout } from './src/components/Layout'

const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>

export default wrapPageElement
