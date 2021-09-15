import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const RowStyled = styled.div`
  width: 100%;
`

const Row = ({ children }) => {
  return <RowStyled>{children}</RowStyled>
}

Row.propTypes = {
  children: PropTypes.any.isRequired
}

export default Row
