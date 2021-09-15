import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const CenterStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Center = ({ children }) => {
  return <CenterStyled>{children}</CenterStyled>
}

Center.propTypes = {
  children: PropTypes.any.isRequired
}

export default Center
