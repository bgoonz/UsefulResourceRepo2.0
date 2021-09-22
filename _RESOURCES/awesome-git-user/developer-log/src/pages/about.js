import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

import Sidebar from "../components/sidebar/Sidebar"

const AboutPage = (props) => {
  return (
    <Layout>
      <SEO title="About" />
      <div className="post-page-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>

        <div className="post-main">
          <SEO title="About" />
          <div className="mt-3">
            <h2 className="heading">About Me</h2>
            <div>
              <h4 className="d-inline">Roles: </h4>
              <p className="d-inline-block ml-2">
                <i>software developer, writer and educator</i>
              </p>
            </div>
            <div>
              <h4 className="d-inline">Tech I'm currently obsessed with: </h4>
              <p className="d-inline-block ml-2">
                <i>Apollo-GraphQL, Gatsby</i>
              </p>
            </div>
            <hr />
            <p>
              An old dog learning new tricks in a brave new world, I'll build
              just about anything if I can, but I mostly build full-stack
              applications. One example of my work is the Gatsby Starter from
              which I've built this blog. Check out{" "}
              <a href="https://www.gatsbyjs.org/starters/willjw3/gatsby-starter-developer-diary/">
                my official starter in the Gatsby Starter Library
              </a>{" "}
              and, if you're so inclined, please use it to make your own
              developer blog (or any kind of blog, really). And, if you do,
              please tweet me with the finished project.
            </p>
            <hr />
            <h4>Availability</h4>
            <p>
              I'm usually available to take on projects, so contact me and maybe
              we can work together. You can find out more about me at my{" "}
              <a href="https://willward.netlify.com/">personal web site</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
