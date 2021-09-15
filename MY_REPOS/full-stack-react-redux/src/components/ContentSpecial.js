import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const ContentSpecialStyled = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
`

const ContentSpecial = ({ children }) => {
  return <ContentSpecialStyled>{children}</ContentSpecialStyled>
}

ContentSpecial.propTypes = {
  children: PropTypes.any.isRequired
}

export default ContentSpecial
