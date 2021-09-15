import React from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'

const IconLinkedIn = ({ colorMode, theme }) => (
  <Icon social accent='#006699'>
    <g clipPath='url(#prefix__clip0)'>
      <path d='M0 4.082C0 2.105 1.645.5 3.672.5h42.341c2.028 0 3.672 1.605 3.672 3.582v42.837c0 1.978-1.644 3.581-3.672 3.581H3.673C1.644 50.5 0 48.897 0 46.92V4.08z' />
      <path
        d='M15.061 42.355V19.777H7.557v22.578h7.505zm-3.75-25.66c2.616 0 4.245-1.734 4.245-3.9-.05-2.216-1.63-3.901-4.196-3.901-2.568 0-4.246 1.685-4.246 3.9 0 2.167 1.628 3.901 4.147 3.901h.049zm7.904 25.66h7.504V29.748c0-.674.049-1.35.247-1.83.542-1.35 1.777-2.746 3.85-2.746 2.715 0 3.802 2.07 3.802 5.106v12.077h7.504V29.41c0-6.935-3.702-10.162-8.64-10.162-4.047 0-5.825 2.262-6.813 3.803h.05v-3.273h-7.503c.097 2.118-.001 22.578-.001 22.578v-.001z'
        fill={
          colorMode === 'dark'
            ? theme.colors.modes.dark.backgroundAlt
            : theme.colors.backgroundAlt
        }
      />
    </g>
  </Icon>
)

IconLinkedIn.propTypes = {
  colorMode: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
}

export default IconLinkedIn
