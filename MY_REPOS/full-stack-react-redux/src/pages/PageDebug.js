import React from 'react'

import { Page, Hero, Content } from '../components'
import { DebugContainer } from '../containers'

const PageDebug = () => {
  return (
    <Page title='Debug' fluid>
      <Hero heading='Debug Mode' />

      <Content>
        <DebugContainer />
      </Content>
    </Page>
  )
}

export default PageDebug
