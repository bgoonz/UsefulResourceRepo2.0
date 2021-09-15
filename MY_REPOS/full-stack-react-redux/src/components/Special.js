import React from 'react'
import PropTypes from 'prop-types'
import { breakpoints } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'

const SpecialStyled = styled.div`
  ${breakpoints({
    xs: css``,
    md: css`
      height: 100vh;
    `
  })}
`

const Special = ({ children }) => {
  return <SpecialStyled>{children}</SpecialStyled>
}

Special.propTypes = {
  children: PropTypes.any.isRequired
}

export default Special
