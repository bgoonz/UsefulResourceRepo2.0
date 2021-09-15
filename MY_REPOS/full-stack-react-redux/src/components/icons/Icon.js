import React from 'react'
import PropTypes from 'prop-types'
import { th } from '@xstyled/system'
import styled from '@xstyled/emotion'

const getFill = ({ social, accent }) =>
  social ? th('colors.textAlt') : th('colors.secondaryAlt')

const getFillHover = ({ social, accent }) =>
  social ? accent : th('colors.secondary')

const IconStyled = styled.svg`
  display: block;
  fill: ${getFill};
  transition: inherit;
  &:hover {
    fill: ${getFillHover};
  }
`

const IconContainer = ({ width, social, accent, children }) => {
  return (
    <IconStyled
      width={social ? '1.5em' : width || '1.2em'}
      viewBox={social ? '0 0 50 50' : '0 0 24 24'}
      social={social}
      accent={accent}
    >
      {children}
    </IconStyled>
  )
}

IconContainer.propTypes = {
  width: PropTypes.string,
  social: PropTypes.bool,
  accent: PropTypes.string,
  children: PropTypes.any.isRequired
}

export default IconContainer
