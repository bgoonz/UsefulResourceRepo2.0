import React from 'react'
import PropTypes from 'prop-types'

import { UserProfile } from '../components'

const UserProfileContainer = ({ user, auth }) => {
  return <UserProfile user={user} auth={auth} />
}

UserProfileContainer.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object
}

export default UserProfileContainer
