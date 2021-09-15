import * as React from "react"
import { Link } from "gatsby"
import Logo from "./logo"

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b pb-6">
      <div className="flex flex-row items-center">
        <Link to="/">
          <Logo className="w-8 sm:w-16 mr-4 sm:mr-6 text-gatsby hover:text-gray-700 focus:text-gray-700" />
        </Link>
        <div>
          <span className="text-xl sm:text-2xl font-bold text-gray-900">Getting Started with Gatsby</span> <br />
          <a href="https://www.gatsbyjs.com/gatsby-coding-careers/" className="text-gray-700 hover:text-gatsby">
            Webinar
          </a>
        </div>
      </div>
      <div>
        <a
          href="https://github.com/LekoArts/gatsby-webinar-getting-started"
          className="text-md sm:text-lg hover:text-gatsby text-gray-700"
        >
          GitHub
        </a>
      </div>
    </header>
  )
}

export default Header
