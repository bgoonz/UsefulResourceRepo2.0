import React from "react"
import Twitter from "../images/twitter.svg"
import "../styles/footer.scss"

const Footer = ({ content, siteTitle }) => {
  return (
    <div className="footer">
      <hr />
      <div className={`footer-${content}`}>
        <a href="https://twitter.com/">
          <img
            className={`footer-${content}-twitter`}
            src={Twitter}
            aria-label="Twitter link"
          />
        </a>
        <p>
          © {new Date().getFullYear()}, {siteTitle}
        </p>
      </div>
    </div>
  )
}

export default Footer
