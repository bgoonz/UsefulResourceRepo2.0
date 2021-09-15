import React from "react"
import { Link } from "gatsby"

const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((post, i) => {
        return (
          <div key={i}>
            <Link to={post.node.fields.slug}>
              <h4>{post.node.frontmatter.title}</h4>
            </Link>
            <small>{post.node.frontmatter.date}</small>
          </div>
        )
      })}
    </>
  )
}

export default PostList
