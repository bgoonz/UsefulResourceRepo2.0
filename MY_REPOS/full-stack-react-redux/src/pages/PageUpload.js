import React from 'react'

import { UploadContainer } from '../containers'
import { Page, Hero, Content } from '../components'

const PageUpload = () => {
  return (
    <Page title='Upload'>
      <Hero heading='Upload Mode' />

      <Content>
        <UploadContainer />
      </Content>
    </Page>
  )
}

export default PageUpload
