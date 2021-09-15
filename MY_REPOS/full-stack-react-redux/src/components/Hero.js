import React from 'react'
import PropTypes from 'prop-types'
import { breakpoints } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'

const HeroStyled = styled.section``

const Heading = styled.h1`
  text-align: center;
  color: text;
  transition: all 0.2s ease-in-out;
  margin: 0;

  ${breakpoints({
    xs: css`
      padding: 50px 20px;
      font-size: 2em;
    `,
    sm: css`
      padding: 60px 0;
      font-size: 2.5em;
    `,
    md: css`
      padding: 70px 0;
      font-size: 3em;
    `
  })}
`

const Hero = ({ heading }) => {
  return (
    <HeroStyled>
      <Heading>{heading}</Heading>
    </HeroStyled>
  )
}

Hero.propTypes = {
  heading: PropTypes.string.isRequired
}

export default Hero
