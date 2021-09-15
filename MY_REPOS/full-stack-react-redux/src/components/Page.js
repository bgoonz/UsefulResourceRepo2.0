/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import { breakpoints } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'
import { motion } from 'framer-motion'

import { SEOContainer, HeaderContainer, FooterContainer } from '../containers'
import site from '../site.json'

const PageStyled = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  color: text;
  background-color: backgroundAlt;
  transition: all 0.2s ease-in-out;
`

const Main = styled(motion.main)`
  flex: 1;
  ${breakpoints({
    xs: css`
      padding-top: 55px;
    `,
    md: css`
      padding-top: 60px;
    `
  })};
  p,
  ul,
  ol {
    ${breakpoints({
      xs: css`
        line-height: 1.8em;
      `,
      md: css`
        font-size: 1.2em;
      `
    })};
  }
  ul {
    padding-left: 2em;
  }
`

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
}

const pageTransition = {
  ease: 'anticipate',
  duration: 0.5
}

const Page = ({
  title,
  description,
  image,
  article = false,
  header = true,
  footer = true,
  children
}) => {
  return (
    <PageStyled>
      <SEOContainer
        title={title}
        description={description}
        image={image}
        article
      />

      {header && <HeaderContainer />}

      <Main
        initial='initial'
        animate='in'
        exit='out'
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </Main>

      {footer && <FooterContainer />}
    </PageStyled>
  )
}

Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
  header: PropTypes.bool,
  footer: PropTypes.bool,
  children: PropTypes.any.isRequired
}

Page.defaultProps = {
  description: site.defaultDescription,
  image: site.defaultImage,
  article: false,
  header: true,
  footer: true
}

export default Page
