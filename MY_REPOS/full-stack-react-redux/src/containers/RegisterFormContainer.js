import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'

import { AuthForm, Alert, Link } from '../components'
import { register } from '../redux/actions/auth'
import useAuthClear from '../hooks/useAuthClear'

const RegisterFormContainer = ({ isLoading, data, error, handleRegister }) => {
  useAuthClear()

  const { register, handleSubmit, errors } = useForm({
    criteriaMode: 'all'
  })

  const submitData = (body) => {
    handleRegister(body)
  }

  return (
    <>
      <AuthForm
        fields={{ name: true, username: true, email: true, password: true }}
        isLoading={isLoading}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        submitData={submitData}
        submitText='Create Account'
        submitTextLoading='Creating account...'
      />

      {error && <Alert>Sorry, registration is failed. Please try again.</Alert>}

      <p>
        Have an account? <Link to='/login'>Login here</Link>
      </p>
    </>
  )
}

RegisterFormContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  error: PropTypes.object,
  handleRegister: PropTypes.func.isRequired
}

export default connect(
  (state) => {
    return {
      isLoading: state.auth.isLoading,
      data: state.auth.data,
      error: state.auth.error
    }
  },
  (dispatch) => {
    return {
      handleRegister: (body) => dispatch(register(body))
    }
  }
)(RegisterFormContainer)
