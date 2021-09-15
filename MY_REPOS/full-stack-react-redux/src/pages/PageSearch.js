import React from 'react'

import { SearchContainer } from '../containers'
import { Page, Hero, Content } from '../components'

const PageSearch = () => {
  return (
    <Page title='Search'>
      <Hero heading='Search Items' />

      <Content>
        <SearchContainer />
      </Content>
    </Page>
  )
}

export default PageSearch
