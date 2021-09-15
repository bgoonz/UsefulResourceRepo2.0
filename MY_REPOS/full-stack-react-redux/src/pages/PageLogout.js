import React from 'react'

import { LogoutContainer } from '../containers'
import { Page, Hero, Content, Center } from '../components'

const PageLogout = () => {
  return (
    <Page title='Logout' header={false} footer={false}>
      <Hero heading='Logout of Template?' />

      <Content>
        <Center>
          <LogoutContainer />
        </Center>
      </Content>
    </Page>
  )
}

export default PageLogout
