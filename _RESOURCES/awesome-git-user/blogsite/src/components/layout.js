/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Header from "./header"
import "../styles/layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [sidebarClass, setSidebarClass] = useState("sidebar")

  const handleSlide = () => {
    setSidebarClass("sidebar-show")
  }
  const handleClose = e => {
    e.preventDefault()
    setSidebarClass("sidebar-hide")
  }

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} isOpen={handleSlide} />
      <main>{children}</main>
      <div className={sidebarClass}>
        <Link to="/tags/web-development">
          <h3 className="sidebar-link">Web Development</h3>
        </Link>
        <a
          href="https://github.com/willjw3/nonlinear-dynamics-notebooks"
          target="_blank"
          rel="noreferrer noopener"
        >
          <h3 className="sidebar-link">Notebooks</h3>
        </a>
        <Link to="/tags/mathematics">
          <h3 className="sidebar-link">Mathematics</h3>
        </Link>
        <Link to="/archives">
          <h3 className="sidebar-link">Browse Archives</h3>
        </Link>
        <a
          href="https://willjw3.netlify.app"
          target="_blank"
          rel="noreferrer noopener"
        >
          <h3 className="sidebar-link">About</h3>
        </a>
        <button className="sidebar-btn" onClick={handleClose}>
          CLOSE
        </button>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
