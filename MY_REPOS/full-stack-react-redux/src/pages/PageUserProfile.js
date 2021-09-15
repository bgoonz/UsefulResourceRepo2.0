import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { UserProfileContainer } from '../containers'
import { Page, Content, Center, NotFound, LoadingSpinner } from '../components'
import { getUserByUsername } from '../redux/actions/user'

const PageUserProfile = ({
  isLoading,
  user,
  auth,
  handleGetUserByUsername
}) => {
  const { slug } = useParams()
  const username = slug[0] === '@' ? slug.substring(1, slug.length) : slug
  const userTitle = user && `${user.name} (@${user.username})`

  useEffect(() => {
    handleGetUserByUsername(username)
  }, [handleGetUserByUsername, username])

  return (
    <Page
      title={
        (isLoading && username) ||
        (!isLoading && user && userTitle) ||
        (!isLoading && !user && 'Page Not Found')
      }
    >
      <Content>
        <Center>
          {slug[0] === '@' && <Redirect to={username} />}
          {isLoading && <LoadingSpinner />}
          {!isLoading && user && (
            <UserProfileContainer user={user} auth={auth} />
          )}
          {!isLoading && !user && <NotFound />}
        </Center>
      </Content>
    </Page>
  )
}

PageUserProfile.propTypes = {
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  auth: PropTypes.object,
  handleGetUserByUsername: PropTypes.func
}

export default connect(
  (state) => {
    return {
      isLoading: state.user.isLoading,
      user: state.user.data,
      auth: state.auth.data
    }
  },
  (dispatch) => {
    return {
      handleGetUserByUsername: (username) =>
        dispatch(getUserByUsername(username))
    }
  }
)(PageUserProfile)
