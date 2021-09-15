import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import image from "../images/meteorite.jpg"

const Header = ({ siteTitle }) => {
  return (
    <header
      style={{
        background: `black`,
        marginBottom: `0`,
      }}
    >
      <div
        className="d-inline-block head-block"
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem`,
        }}
      >
        <h1 className="head-title d-inline-block" style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `#49fb35`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div className="d-inline-block">
        <img
          className="rounded head-image img-fluid"
          src={image}
          alt="meteorites bombarding Earth"
        />
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
