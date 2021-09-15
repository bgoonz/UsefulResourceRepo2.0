import React from 'react'

import { Page, Hero, Content, Center } from '../components'
import { ItemsContainer } from '../containers'

const PageItems = () => {
  return (
    <Page title='Items'>
      <Hero heading='List of Available Items' />

      <Content>
        <Center>
          <ItemsContainer />
        </Center>
      </Content>
    </Page>
  )
}

export default PageItems
