import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { variant } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'

const LinkButtonStyled = styled(Link)`
  cursor: pointer;
  display: inline-block;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
  padding: 5px 10px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  ${variant({
    default: 'primary',
    variants: {
      primary: css`
        background-color: primary;
        &:hover {
          background-color: primaryAlt;
        }
      `,
      secondary: css`
        background-color: secondary;
        &:hover {
          background-color: secondaryAlt;
        }
      `,
      tertiary: css`
        color: primary;
        border-width: 3px;
        border-style: solid;
        border-color: primary;
        &:hover {
          color: primaryAlt;
          border-color: primaryAlt;
        }
      `
    }
  })}
`

const LinkButton = ({ variant = 'primary', to, children }) => {
  return (
    <LinkButtonStyled to={to} variant={variant}>
      {children}
    </LinkButtonStyled>
  )
}

LinkButton.propTypes = {
  variant: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default LinkButton
