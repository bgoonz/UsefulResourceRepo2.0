import React from 'react'
import styled from '@xstyled/emotion'

import {
  Page,
  Special,
  HeroSpecial,
  ContentSpecial,
  Buttons,
  LinkButton
} from '../components'

const Marker = styled.mark`
  color: primary;
`

const PageHome = () => {
  return (
    <Page>
      <Special>
        <HeroSpecial>
          Starter kit to build a<br />
          <Marker>complete web app.</Marker>
        </HeroSpecial>

        <ContentSpecial>
          <p>
            Powered by JavaScript, Node.js, React, Redux, Express, MongoDB,
            PostgreSQL, REST API, PM2, Netlify, Google Cloud Platform, PM2,
            Nginx, Let's Encrypt, Circle CI, Docker, Cloudflare, and
            Uniregistry.
          </p>
          <Buttons center>
            <LinkButton variant='primary' to='/register'>
              Get started
            </LinkButton>
            <LinkButton variant='secondary' to='/about'>
              Learn more
            </LinkButton>
          </Buttons>
        </ContentSpecial>
      </Special>
    </Page>
  )
}

export default PageHome
