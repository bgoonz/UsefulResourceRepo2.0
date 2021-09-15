import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const AnchorStyled = styled.a`
  color: primary;
  font-weight: 400;
  &:hover {
    color: primaryAlt;
  }
`

const Anchor = ({ href, children }) => {
  return (
    <AnchorStyled href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </AnchorStyled>
  )
}

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Anchor
