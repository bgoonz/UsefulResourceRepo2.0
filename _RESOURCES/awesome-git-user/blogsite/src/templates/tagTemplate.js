import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Footer from "../components/footer"
import PostTag from "../components/posttag"
import Img from "gatsby-image"
import SEO from "../components/seo"
import "../styles/tagTemplate.scss"

const TagTemplate = ({ pageContext, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const tagHeader = `${tag}: ${totalCount} post${
    totalCount === 1 ? "" : "s"
  }`.replace("-", " ")

  return (
    <Layout>
      <SEO title={tag} />
      <div className="tagtemplate">
        <div className="tagtemplate-body">
          <i>
            <h2 className="tagtemplate-body-heading">{tagHeader}</h2>
          </i>
          {posts.map((post, i) => {
            const tags = post.node.frontmatter.tags
            return (
              <>
                <div className="tagtemplate-body-post" key={i}>
                  <Link
                    className="tagtemplate-body-post-link"
                    to={post.node.fields.slug}
                  >
                    <h2>{post.node.frontmatter.title}</h2>
                  </Link>
                  <small className="tagtemplate-body-post-date">
                    Posted on {post.node.frontmatter.date}
                  </small>
                  <hr className="tagtemplate-body-post-under" />
                  {post.node.frontmatter.image && (
                    <Img
                      fluid={post.node.frontmatter.image.childImageSharp.fluid}
                      style={{
                        width: "160px",
                        float: "left",
                        marginRight: "10px",
                        boxShadow: "1px 1px 3px",
                      }}
                    />
                  )}
                  <p>{post.node.excerpt}</p>
                  <Link
                    className="tagtemplate-body-post-link"
                    to={post.node.fields.slug}
                  >
                    <small> Read full post</small>
                  </Link>
                </div>
                <hr />
                <div className="tagtemplate-body-post-tag-wrap">
                  {tags.map((tag, i) => {
                    return <PostTag key={i} tag={tag} />
                  })}
                </div>
              </>
            )
          })}
        </div>
        <Footer content="light" siteTitle={siteTitle} />
      </div>
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          html
          id
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
          fields {
            slug
          }
        }
      }
    }
  }
`
