import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/about.scss"

const About = ({ data }) => {
  const professionalTech = []
  const infoRole = []
  const infoProgress = []
  data.allMarkdownRemark.edges.forEach(item => {
    if (item.node.frontmatter.pagetype === "tech") {
      professionalTech.push(item)
    }
    if (
      item.node.frontmatter.pagetype === "info" &&
      item.node.frontmatter.title === "Role"
    ) {
      infoRole.push(item)
    }
    if (
      item.node.frontmatter.pagetype === "info" &&
      item.node.frontmatter.title === "Work In Progress"
    ) {
      infoProgress.push(item)
    }
  })

  return (
    <Layout>
      <SEO title="About" />
      <div className="pimg1">
        <div className="ptext">
          <span className="border">Who I Am</span>
        </div>
      </div>
      <section className="section">
        <h2>Past & Present Succinctly</h2>
        <p>
          <strong>Origin: </strong>Southern California, USA
        </p>
        <p>
          <strong>Based In: </strong>Tokyo, Japan
        </p>
        <p>
          <strong>Occupation: </strong>Web Developer
        </p>
        <p>
          <strong>Education: </strong>Bachelor of Science - Physics
        </p>
        <br />
        <div dangerouslySetInnerHTML={{ __html: infoRole[0].node.html }} />
      </section>
      <div className="pimg2">
        <div className="ptext">
          <span className="border">Tech I Work With</span>
        </div>
      </div>
      <section className="section">
        <h2>Languages, Libraries, Etc.</h2>
        <div className="tech-icons">
          {professionalTech.length &&
            professionalTech.map((tech, i) => {
              return (
                <div key={i} className="tech-icons-icon">
                  <img
                    src={tech.node.frontmatter.image.publicURL}
                    alt={tech.node.frontmatter.title}
                  />
                  <small>{tech.node.frontmatter.title}</small>
                </div>
              )
            })}
        </div>
      </section>
      <div className="pimg3">
        <div className="ptext">
          <span className="border">Send Me A Message</span>
          <a href="mailto:willjw3dev@gmail.com">
            <h4>willjw3dev@gmail.com</h4>
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query aboutQuery {
    site {
      siteMetadata {
        title
      }
    }
    profilePic: file(relativePath: { eq: "bt.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(sort: { fields: frontmatter___id, order: ASC }) {
      totalCount
      edges {
        node {
          html
          frontmatter {
            title
            image {
              publicURL
            }
            pagetype
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
