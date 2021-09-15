import React from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'
import theme from '../../data/theme.json'

const IconFacebook = ({ colorMode }) => (
  <Icon social accent='#485A96'>
    <g clipPath='url(#prefix__clip0)'>
      <path d='M47.24 50.5A2.76 2.76 0 0050 47.74V3.26A2.76 2.76 0 0047.24.5H2.76A2.76 2.76 0 000 3.26v44.48a2.76 2.76 0 002.76 2.76h44.48z' />
      <path
        d='M34.5 50.5V31.137h6.498l.974-7.546h-7.473v-4.817c0-2.185.607-3.674 3.74-3.674l3.995-.002V8.35c-.69-.092-3.063-.297-5.822-.297-5.761 0-9.706 3.516-9.706 9.974v5.565H20.19v7.546h6.516V50.5H34.5z'
        fill={
          colorMode === 'dark'
            ? theme.colors.modes.dark.backgroundAlt
            : theme.colors.backgroundAlt
        }
      />
    </g>
  </Icon>
)

IconFacebook.propTypes = { colorMode: PropTypes.string.isRequired }

export default IconFacebook
