import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const HeroSpecialStyled = styled.section`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
`

const Heading = styled.h1`
  color: text;
  transition: all 0.2s ease-in-out;
  font-weight: 900;
  margin-bottom: 0;
  padding: 1em 0;
  letter-spacing: -0.05em;
  font-size: calc(10px + 5vw);
`

const HeroSpecial = ({ children }) => {
  return (
    <HeroSpecialStyled>
      <Heading>{children}</Heading>
    </HeroSpecialStyled>
  )
}

HeroSpecial.propTypes = {
  children: PropTypes.any.isRequired
}

export default HeroSpecial
