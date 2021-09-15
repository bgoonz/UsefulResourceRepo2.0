import React from "react"
import "../styles/footer.scss"

const Footer = ({ content, siteTitle }) => {
  return (
    <div className="footer">
      <hr />
      <div className={`footer-${content}`}>
        <p>
          © {new Date().getFullYear()}, {siteTitle}
        </p>
      </div>
    </div>
  )
}

export default Footer
