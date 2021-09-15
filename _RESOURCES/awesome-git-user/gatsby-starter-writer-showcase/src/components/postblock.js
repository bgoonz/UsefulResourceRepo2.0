import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import "../styles/postblock.scss"

const PostBlock = ({ post }) => {
  let postImg = post.node.frontmatter.image
    ? post.node.frontmatter.image.childImageSharp.fluid
    : null

  return (
    <div className="postblock">
      <Link to={post.node.fields.slug}>
        <h1>{post.node.frontmatter.title}</h1>
      </Link>
      <small>{post.node.frontmatter.date}</small>
      <hr />
      {postImg && <Img fluid={postImg} />}
      <div dangerouslySetInnerHTML={{ __html: post.node.snippet }} />
      <Link to={post.node.fields.slug}>
        <button>Read the Full Post</button>
      </Link>
    </div>
  )
}

export default PostBlock
