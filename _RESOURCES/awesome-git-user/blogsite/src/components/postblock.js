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
        <h2>{post.node.frontmatter.title}</h2>
      </Link>
      <small>{post.node.frontmatter.date}</small>
      <hr />
      <div className="postblock-image">
        {postImg && <Img fluid={postImg} style={{ width: "100%" }} />}
      </div>

      <div dangerouslySetInnerHTML={{ __html: post.node.snippet }} />
      <Link to={post.node.fields.slug}>
        <button>Read the Full Post</button>
      </Link>
    </div>
  )
}

export default PostBlock
