import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const ContentStyled = styled.div`
  padding: 0 20px;
  max-width: 720px;
  margin: 0 auto;
`

const Content = ({ children }) => {
  return <ContentStyled>{children}</ContentStyled>
}

Content.propTypes = {
  children: PropTypes.any.isRequired
}

export default Content
