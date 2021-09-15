import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Page, Hero, Content, Center } from '../components'
import { RegisterFormContainer } from '../containers'

const PageRegister = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <Page title='Register'>
        <Hero heading='Create your new account' />

        <Content>
          <Center>
            <RegisterFormContainer />
          </Center>
        </Content>
      </Page>
    )
  } else {
    return <Redirect to='/login' />
  }
}

PageRegister.propTypes = {
  isAuthenticated: PropTypes.bool
}

export default connect((state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
})(PageRegister)
