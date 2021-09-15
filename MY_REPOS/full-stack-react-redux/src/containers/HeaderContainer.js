import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { useUp } from '@xstyled/emotion'

import { HeaderDesktop, HeaderMobile } from '../components'

const HeaderContainerStyled = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  transition: inherit;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: borderAlt;
  background-color: ${({ desktop }) =>
    desktop ? 'backgroundGlass' : 'backgroundAlt'};
  backdrop-filter: saturate(180%) blur(5px);
`

const HeaderContainer = ({ isAuthenticated, authenticatedUser }) => {
  const desktop = useUp('md')

  return (
    <HeaderContainerStyled desktop={desktop}>
      {desktop ? (
        <HeaderDesktop
          isAuthenticated={isAuthenticated}
          authenticatedUser={authenticatedUser}
        />
      ) : (
        <HeaderMobile
          isAuthenticated={isAuthenticated}
          authenticatedUser={authenticatedUser}
        />
      )}
    </HeaderContainerStyled>
  )
}

HeaderContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authenticatedUser: PropTypes.object
}

export default connect((state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated || false,
    authenticatedUser: state.auth.data.user || {}
  }
})(HeaderContainer)
