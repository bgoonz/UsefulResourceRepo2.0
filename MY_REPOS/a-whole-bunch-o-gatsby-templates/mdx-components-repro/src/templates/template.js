import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Post = ({ data: { mdx } }) => (
  <main>
    <div>{mdx.frontmatter.title}</div>
    <div><MDXRenderer>{mdx.body}</MDXRenderer></div>
  </main>
)

export default Post

export const query = graphql`
  query postBySlug($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      body
      frontmatter {
        title
      }
    }
  }
`