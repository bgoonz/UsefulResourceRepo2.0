import React from "react"

const Footer = () => {
  return (
    <div>
      <footer className="text-light text-center">
        © {new Date().getFullYear()}{" "}
        <a className="text-info" href="https://willjw3.github.io/">
          willjw3
        </a>
        .{" "}
        <span className="ml-3">
          Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </span>
      </footer>
    </div>
  )
}

export default Footer
