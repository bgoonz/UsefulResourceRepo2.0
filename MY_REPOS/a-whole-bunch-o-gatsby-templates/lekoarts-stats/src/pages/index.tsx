import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import Seo from '../components/seo'
import { nivoGithubFormatter, nivoTwitterFormatter, normalizeGithub } from '../utils/normalize'
import Line from '../components/line'
import * as styles from '../styles/pages-index.css'
import { atoms } from '../styles/sprinkles.css'
import { IHomepageDataProps } from '../types'
import { linkStyle } from '../styles/global.css'

import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/400-italic.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/500-italic.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource/ibm-plex-mono/700.css'

const Index: React.FC<PageProps<IHomepageDataProps>> = ({ data: { site, github, twitter } }) => {
  const modes = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
    storageKey: 'lekoarts-stats-modes',
  })
  const normalizedGithubData = normalizeGithub(github.nodes, 'name', 'name')
  const meta = site.siteMetadata

  const githubContent = [
    {
      heading: 'Stars',
      data: nivoGithubFormatter(normalizedGithubData, 'stars'),
    },
    {
      heading: 'Forks',
      data: nivoGithubFormatter(normalizedGithubData, 'forks'),
    },
  ]

  const twitterContent = [
    {
      heading: 'Followers',
      data: nivoTwitterFormatter(twitter.nodes, 'followers'),
    },
    {
      heading: 'Tweets',
      data: nivoTwitterFormatter(twitter.nodes, 'tweets'),
    },
  ]

  return (
    <React.Fragment>
      <Seo meta={meta} />
      <header className={styles.header}>
        <h1 className={atoms({ margin: 'none' })}>{site.siteMetadata.title}</h1>
        <div className={atoms({ display: 'flex', alignItems: 'center' })}>
          <button
            className={styles.button}
            onClick={modes.toggle}
            aria-label={modes.value ? 'Activate Light Mode' : 'Activate Dark Mode'}
          >
            {modes.value ? 'Light' : 'Dark'}
          </button>
          <a className={linkStyle} href={meta.repo}>
            GitHub
          </a>
        </div>
      </header>
      <main
        className={atoms({
          paddingY: { mobile: '3x', desktop: '5x' },
          paddingX: { mobile: '4x', desktop: '6x' },
        })}
      >
        <h2 className={atoms({ marginY: 'none' })}>GitHub</h2>
        <section className={styles.content}>
          {githubContent.map((g) => (
            <div key={g.heading}>
              <h3 className={atoms({ color: { light: 'gray-700' } })}>{g.heading}</h3>
              <div className={styles.lineContainer}>
                <Line data={g.data} />
              </div>
            </div>
          ))}
        </section>
        <div className={atoms({ paddingY: '6x', paddingX: 'none' })} />
        <h2 className={atoms({ marginY: 'none' })}>Twitter</h2>
        <section className={styles.content}>
          {twitterContent.map((g) => (
            <div key={g.heading}>
              <h3 className={atoms({ color: { light: 'gray-700' } })}>{g.heading}</h3>
              <div className={styles.lineContainer}>
                <Line data={g.data} yScaleMin="auto" />
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} by{' '}
        <a className={linkStyle} href={meta.homepage}>
          LekoArts
        </a>
        . All rights reserved. <br />
        Follow me on{' '}
        <a className={linkStyle} href={meta.github}>
          GitHub
        </a>{' '}
        or{' '}
        <a className={linkStyle} href={meta.twitter}>
          Twitter
        </a>
        . <br />
        Data is pulled daily. Last build: {site.buildTime}
      </footer>
    </React.Fragment>
  )
}

export default Index

export const query = graphql`
  query IndexQuery {
    site {
      ...meta
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
    github: allGithub(sort: { fields: datetime, order: ASC }) {
      nodes {
        id
        datetime(formatString: "YYYY-MM-DD")
        repos {
          forks
          id
          name
          stars
          url
        }
      }
    }
    twitter: allTwitter(sort: { fields: datetime, order: ASC }) {
      nodes {
        tweets
        followers
        datetime(formatString: "YYYY-MM-DD")
      }
    }
  }
`
