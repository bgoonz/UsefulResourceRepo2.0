import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import { ModalProvider } from "gatsby-plugin-modal"

const Content = styled(`div`)`
  margin: 0 auto;
  max-width: 50rem;
  padding: 5rem 0;

  h1 {
    font-size: 3.6rem;
    margin: 0;
    margin-bottom: 5rem;
    letter-spacing: -0.03em;
  }

  h2 {
    font-size: 2rem;
    margin: 5rem 0 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 3rem;
  }

  a > img {
    border: 1px solid #ddd;
  }

  .gatsby-highlight {
    max-height: 20rem;
    overflow-y: auto;
    border-radius: 0.2rem;
    margin: 3rem 0;

    pre {
      margin: 0;
      padding: 1rem 1.5rem;
    }

    /* width */
    &::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #222;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #666;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #999;
    }
  }
`

const PageLayout = ({ children, className }) => (
  <ModalProvider>
    <Global
      styles={css`
        body {
          margin: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        }

        body * {
          box-sizing: inherit;
        }
      `}
    />

    <Content className={className}>{children}</Content>
  </ModalProvider>
)

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
