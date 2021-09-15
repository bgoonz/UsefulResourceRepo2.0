import React from 'react'

import { UsersContainer } from '../containers'
import { Page, Hero, Content, Center } from '../components'

const PageUsers = () => {
  return (
    <Page title='Users'>
      <Hero heading='List of Registered Users' />

      <Content>
        <Center>
          <UsersContainer />
        </Center>
      </Content>
    </Page>
  )
}

export default PageUsers
