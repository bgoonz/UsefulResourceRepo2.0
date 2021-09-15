import React from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'

const accent = '#ffdd33'

const IconAzobu = ({ colorMode }) => (
  <Icon social accent={colorMode === 'dark' ? accent : '#000'}>
    <g clipPath='url(#prefix__clip0)'>
      <path d='M25 50.5c13.807 0 25-11.193 25-25S38.807.5 25 .5 0 11.693 0 25.5s11.193 25 25 25z' />
      <path
        fill={colorMode === 'dark' ? '#000' : accent}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M26.237 12.305a1.5 1.5 0 00-2.474 0L20.01 17.78a1.5 1.5 0 01-.813.59l-6.364 1.877a1.5 1.5 0 00-.765 2.353l4.046 5.26c.21.273.32.61.31.955l-.182 6.633a1.5 1.5 0 002.002 1.455l6.252-2.223a1.5 1.5 0 011.006 0l6.252 2.223a1.5 1.5 0 002.002-1.455l-.183-6.633a1.5 1.5 0 01.31-.956l4.047-5.259a1.5 1.5 0 00-.765-2.353l-6.364-1.876a1.5 1.5 0 01-.814-.591l-3.75-5.474zM25 30.5a5 5 0 100-10 5 5 0 000 10z'
      />
    </g>
  </Icon>
)

IconAzobu.propTypes = { colorMode: PropTypes.string }

export default IconAzobu
