import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'
import { Link as ReactRouterLink } from 'react-router-dom'

const LinkStyled = styled(ReactRouterLink)`
  font-weight: 700;
  text-decoration: none;
  color: primary;
  &:hover {
    color: primaryAlt;
  }
`

const Link = ({ to, children }) => {
  return <LinkStyled to={to}>{children}</LinkStyled>
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default Link
