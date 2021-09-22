import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostTag from "../components/posttag"
import Footer from "../components/footer"
import Img from "gatsby-image"
import SEO from "../components/seo"
import "../styles/article.scss"

const Article = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const post = data.markdownRemark
  let postImg = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.fluid
    : null
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className={`article ${darkMode ? `dark-mode` : ``}`}>
        <div className="article-main">
          <div className="article-main-toggle">
            <span style={{ color: darkMode ? "grey" : "orange" }}>☀</span>
            <span className="article-main-toggle-switch">
              <input
                checked={darkMode}
                onChange={() => setDarkMode(prevMode => !prevMode)}
                id="checkbox"
                className="checkbox"
                type="checkbox"
              />
              <label htmlFor="checkbox">
                <input type="text" style={{ visibility: "hidden" }} />
              </label>
            </span>
            <span style={{ color: darkMode ? "orange" : "gray" }}>☽</span>
          </div>
          <h1>{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
          <hr />
          {postImg && <Img fluid={postImg} />}
          <div
            className="article-main-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div className="article-main-tags">
            {post.frontmatter.tags.map(tag => {
              return <PostTag tag={tag} />
            })}
          </div>
        </div>
        <Footer content="light" siteTitle={siteTitle} />
      </div>
    </Layout>
  )
}

export default Article

export const pageQuery = graphql`
  query articleQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
