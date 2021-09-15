import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Paragraph, Buttons, Button } from '../components'
import { navigateBack } from '../redux/actions/navigation'
import { logout } from '../redux/actions/auth'

const LogoutContainer = ({
  isLoading,
  isAuthenticated,
  handleNavigateBack,
  handleLogout
}) => {
  return (
    <>
      {!isAuthenticated && <Redirect to='/' />}
      {!isLoading && isAuthenticated && (
        <>
          <Paragraph>You can log back in at any time</Paragraph>
          <Buttons>
            <Button variant='secondary' onClick={handleNavigateBack}>
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={handleLogout}
              disabled={isLoading}
            >
              {!isLoading ? 'Logout' : 'Logging out...'}
            </Button>
          </Buttons>
        </>
      )}
    </>
  )
}

LogoutContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  handleNavigateBack: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      isLoading: state.auth.isLoading,
      isAuthenticated: state.auth.isAuthenticated
    }
  },
  (dispatch) => {
    return {
      handleNavigateBack: () => dispatch(navigateBack()),
      handleLogout: () => dispatch(logout())
    }
  }
)(LogoutContainer)
