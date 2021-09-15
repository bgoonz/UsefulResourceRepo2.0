import React from "react"
import { graphql } from 'gatsby'
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import Layout from "../components/layout"
import Banner from '../components/banner'

const Blogpost = ({ data: { mdx } }) => {
  return (
    <Layout>
      <Banner bannertype={mdx.frontmatter.bannertype}>{mdx.frontmatter.title}</Banner>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  )
}

export default Blogpost

export const query = graphql`
  query BlogpostTemplate($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        title
        bannertype
      }
      code {
        body
      }
    }
  }
`
