import React from 'react'

import { Page, Hero, Content, Anchor } from '../components'

import repositories from '../data/repositories.json'
import features from '../data/features.json'

const PageAbout = () => {
  return (
    <Page title='About'>
      <Hero heading='About This Template' />

      <Content>
        <section>
          <h2>Starter kit project to build a complete web app</h2>
          <p>
            It is made highly opiniated by{' '}
            <Anchor href='https://mhaidarhanif.com'>M Haidar Hanif</Anchor> from{' '}
            <Anchor href='https://azobu.com'>Azobu</Anchor>. The main goal is to
            be a template and starter kit for professional developers in web
            development ecosystem. You can access the applications at{' '}
            <Anchor href='https://template.azobu.com'>
              template.azobu.com
            </Anchor>{' '}
            and{' '}
            <Anchor href='https://api.template.azobu.com'>
              api.template.azobu.com
            </Anchor>
          </p>
        </section>

        <section>
          <h2>Top 10 features</h2>
          <ol>
            {features.map((feature, index) => (
              <li key={index}>{feature.name}</li>
            ))}
          </ol>
          <h2>Repositories</h2>
          <p>All source code are located on GitHub at:</p>
          <ul>
            {repositories.map((repo, index) => {
              return (
                <li key={index}>
                  <Anchor href={repo.url}>{repo.text}</Anchor>
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <h2>Tech Stack</h2>
          <p>
            Using only the most popular, battle-tested tools and technologies
            for building a full stack web application:
          </p>
          <p>
            Git, GitHub, Markdown, HTML, CSS, JavaScript, Node.js, React, React
            Router, React Helmet, Redux, Redux Dev Tools, Redux Logger, Redux
            Thunk, CSS-in-JS (xstyled/emotion), Google Fonts, Axios, Express,
            Nodemon, Morgan, MongoDB, Mongoose, PostgreSQL, Sequelize, bcrypt,
            JSON Web Token (JWT), dotenv-flow, Jest, ESLint, Prettier, Standard,
            Netlify, Google Cloud Platform, Nginx, Let's Encrypt, Circle CI,
            Docker, Cloudflare, Uniregistry.
          </p>
        </section>
      </Content>
    </Page>
  )
}

export default PageAbout
