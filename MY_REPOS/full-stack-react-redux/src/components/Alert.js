import React from 'react'
import PropTypes from 'prop-types'
import { variant } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'

const AlertStyled = styled.p`
  margin: 0;
  font-size: 1em;
  ${variant({
    default: 'error',
    variants: {
      error: css`
        color: textError;
      `,
      info: css`
        color: textDisabled;
      `
    }
  })}
`

const Alert = ({ variant = 'error', children }) => {
  return <AlertStyled variant={variant}>{children}</AlertStyled>
}

Alert.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.any.isRequired
}

export default Alert
