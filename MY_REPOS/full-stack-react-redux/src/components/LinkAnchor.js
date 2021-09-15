import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { variant } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'

const LinkAnchorStyled = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;

  ${variant({
    default: 'text',
    variants: {
      primary: css`
        color: primary;
        &:hover {
          color: primaryAlt;
        }
      `,
      secondary: css`
        color: secondary;
        &:hover {
          color: secondaryAlt;
        }
      `,
      danger: css`
        color: textError;
      `,
      text: css`
        color: text;
        &:hover {
          color: textAlt;
        }
      `
    }
  })}
`

const LinkAnchor = ({ variant, to, children }) => {
  return (
    <LinkAnchorStyled variant={variant} to={to}>
      {children}
    </LinkAnchorStyled>
  )
}

LinkAnchor.propTypes = {
  variant: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

export default LinkAnchor
