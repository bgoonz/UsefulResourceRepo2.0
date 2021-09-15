import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Footer from "../components/footer"
import Latest from "../components/latest"
import PostBlock from "../components/postblock"
import PostList from "../components/postlist"
import SEO from "../components/seo"
import "../styles/index.scss"

const IndexPage = ({ data }) => {
  const allTags = data.allMarkdownRemark.group.map(tag => {
    return tag.fieldValue
  })
  const posts = data.allMarkdownRemark.edges

  const siteTitle = data.site.siteMetadata.title
  const dataSciencePosts = []
  const webDevelopmentPosts = []
  const mathematicsPosts = []

  for (let i = 0; i < posts.length; i++) {
    if (
      posts[i].node.frontmatter.tags.includes("data-science") &&
      dataSciencePosts.length < 2
    ) {
      dataSciencePosts.push(posts[i])
    }
    if (
      posts[i].node.frontmatter.tags.includes("web-development") &&
      webDevelopmentPosts.length < 2
    ) {
      webDevelopmentPosts.push(posts[i])
    }
    if (
      posts[i].node.frontmatter.tags.includes("mathematics") &&
      mathematicsPosts.length < 2
    ) {
      mathematicsPosts.push(posts[i])
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className="index">
        <div className="index-main">
          <Latest />
          <div className="index-main-body">
            <div className="index-main-body-post">
              <PostBlock post={posts[0]} />
            </div>
            <div className="index-main-body-postlist">
              <h3>Web Development</h3>
              <PostList posts={webDevelopmentPosts} />
              <h3>Data Science</h3>
              <PostList posts={dataSciencePosts} />
              <h3>Mathematics</h3>
              <PostList posts={mathematicsPosts} />
              <div>
                <h3>All Topics</h3>
                {allTags.map((tag, i) => {
                  return (
                    <Link key={i} to={`/tags/${tag}`}>
                      <p style={{ margin: "0", textDecoration: "none" }}>
                        {tag}
                      </p>
                    </Link>
                  )
                })}
              </div>
              <hr />
              <Link to="/archives">
                <h3
                  style={{
                    marginTop: "50px",
                    background: "none",
                    textDecoration: "underline",
                    boxShadow: "none",
                  }}
                >
                  Browse Archives
                </h3>
              </Link>
            </div>
          </div>
        </div>
        <Footer content="light" siteTitle={siteTitle} />
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query indexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 20
      filter: { fileAbsolutePath: { regex: "/articles/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          snippet
          html
          excerpt(pruneLength: 720)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            pagetype
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
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
