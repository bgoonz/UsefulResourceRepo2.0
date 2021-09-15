import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import useSettingsClear from '../hooks/useSettingsClear'
import { UserSettingsForm } from '../components'

const UserSettingsContainer = ({
  isLoading,
  user,
  error,
  handleUpdateUserSettings,
  handleGetAuthenticatedUser
}) => {
  useSettingsClear()

  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
      email: user.email
    }
  })

  const submitData = async (data) => {
    await handleUpdateUserSettings(data)
    handleGetAuthenticatedUser()
    // Get last updated authenticated user after update user settings completed
  }

  return (
    <>
      {!isLoading && user && (
        <UserSettingsForm
          isLoading={isLoading}
          user={user}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          submitData={submitData}
        />
      )}
    </>
  )
}

UserSettingsContainer.propTypes = {
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  error: PropTypes.object,
  handleUpdateUserSettings: PropTypes.func.isRequired,
  handleGetAuthenticatedUser: PropTypes.func.isRequired
}

export default UserSettingsContainer
