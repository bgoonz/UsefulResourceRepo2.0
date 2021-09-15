import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import GH from "../images/github.svg"
import SO from "../images/stackoverflow.svg"
import fCC from "../images/freecodecamp.svg"
import LI from "../images/linkedin.svg"
import YT from "../images/youtube.svg"
import "../styles/header.scss"

const Header = ({ siteTitle, isOpen }) => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-content-title">
          <Link to="/" className="header-content-title-link">
            <h1>{siteTitle}</h1>
          </Link>
        </div>
        <div className="header-content-social">
          <div className="header-content-social-link">
            <a
              href="https://github.com/willjw3"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="github-link"
              alt="github link"
            >
              <img
                src={GH}
                alt=""
                className="header-content-social-link-icon"
              />
            </a>
          </div>
          <div className="header-content-social-link">
            <a
              href="https://stackoverflow.com/users/10262432/will-ward"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="stackoverflow-link"
              alt="stackoverflow link"
            >
              <img
                src={SO}
                alt=""
                className="header-content-social-link-icon"
              />
            </a>
          </div>
          <div className="header-content-social-link">
            <a
              href="https://www.freecodecamp.org/willjw3"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="freecodecamp-link"
              alt="freecodecamp link"
            >
              <img
                src={fCC}
                alt=""
                className="header-content-social-link-icon"
              />
            </a>
          </div>
          <div className="header-content-social-link">
            <a
              href="https://www.youtube.com/channel/UCroJckuB_ohjtZUewCv0Ukw?view_as=subscriber"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="youtube-link"
              alt="youtube link"
            >
              <img
                src={YT}
                alt=""
                className="header-content-social-link-icon"
              />
            </a>
          </div>
          <div className="header-content-social-link">
            <a
              href="https://www.linkedin.com/in/will-ward-65234a170/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="linkedin-link"
              alt="linked in"
            >
              <img
                src={LI}
                alt=""
                className="header-content-social-link-icon"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="header-links">
        <div className="header-links-internal">
          <Link
            className="header-links-internal-link"
            to="/tags/web-development"
          >
            Web Development
          </Link>
          <a
            className="header-links-internal-link"
            href="https://github.com/willjw3/nonlinear-dynamics-notebooks"
            target="_blank"
            rel="noreferrer noopener"
          >
            Notebooks
          </a>
          <Link className="header-links-internal-link" to="/tags/mathematics">
            Mathematics
          </Link>
          <a
            href="https://willjw3.netlify.app/"
            className="header-links-internal-link"
          >
            About
          </a>
        </div>
      </div>
      <div className="header-burger">
        <button className="header-burger-btn" onClick={isOpen}>
          MENU
        </button>
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
