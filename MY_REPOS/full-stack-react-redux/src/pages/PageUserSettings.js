import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { UserSettingsContainer } from '../containers'
import { Page, Alert, Content, Center, LoadingSpinner } from '../components'
import { getUserSettings, updateUserSettings } from '../redux/actions/settings'
import { getAuthenticatedUser } from '../redux/actions/auth'

const PageUserSettings = ({
  isAuthenticated,
  isLoading,
  error,
  user,
  handleGetUserSettings,
  handleUpdateUserSettings,
  handleGetAuthenticatedUser
}) => {
  useEffect(() => {
    isAuthenticated && handleGetUserSettings()
  }, [isAuthenticated, handleGetUserSettings])

  return (
    <Page title='User Settings'>
      <Content>
        <Center>
          {error && (
            <Alert>There is an error. Please check and try again.</Alert>
          )}
          {!isAuthenticated && <Redirect to='/' />}
          {isAuthenticated && isLoading && <LoadingSpinner />}
          {isAuthenticated && !isLoading && user && (
            <UserSettingsContainer
              isLoading={isLoading}
              error={error}
              user={user}
              handleUpdateUserSettings={handleUpdateUserSettings}
              handleGetAuthenticatedUser={handleGetAuthenticatedUser}
            />
          )}
        </Center>
      </Content>
    </Page>
  )
}

PageUserSettings.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  user: PropTypes.object,
  handleGetUserSettings: PropTypes.func.isRequired,
  handleUpdateUserSettings: PropTypes.func.isRequired,
  handleGetAuthenticatedUser: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.settings.isLoading,
      error: state.settings.error,
      user: state.settings.data
    }
  },
  (dispatch) => {
    return {
      handleGetUserSettings: () => dispatch(getUserSettings()),
      handleUpdateUserSettings: (data) => dispatch(updateUserSettings(data)),
      handleGetAuthenticatedUser: () => dispatch(getAuthenticatedUser())
      // Remember to pass the data if the function requires it
    }
  }
)(PageUserSettings)
