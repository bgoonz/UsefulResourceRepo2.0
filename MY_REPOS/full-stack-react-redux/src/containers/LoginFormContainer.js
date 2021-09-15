import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'

import { AuthForm, Alert, Link } from '../components'
import { login } from '../redux/actions/auth'
import useAuthClear from '../hooks/useAuthClear'

const LoginFormContainer = ({ isLoading, error, handleLogin }) => {
  useAuthClear()

  const { register, handleSubmit, errors } = useForm({
    criteriaMode: 'all'
  })

  const submitData = (body) => {
    handleLogin(body)
  }

  return (
    <>
      <AuthForm
        fields={{ email: true, password: true }}
        isLoading={isLoading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        submitData={submitData}
        submitText='Login'
        submitTextLoading='Logging in...'
      />

      {error && (
        <Alert>
          Sorry, login is failed. Please check your email and password then try
          again.
        </Alert>
      )}

      <p>
        New here? <Link to='/register'>Register for free</Link>
      </p>
    </>
  )
}

LoginFormContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleLogin: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      isLoading: state.auth.isLoading,
      error: state.auth.error
    }
  },
  (dispatch) => {
    return {
      handleLogin: (body) => dispatch(login(body))
    }
  }
)(LoginFormContainer)
