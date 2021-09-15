import React from "react"
import { Link } from "gatsby"
import "../styles/posttag.scss"

const PostTag = ({ tag }) => {
  return (
    <div className="posttag">
      <Link className="posttag-link" to={`/tags/${tag.toLowerCase()}/`}>
        <small>{tag}</small>
      </Link>
    </div>
  )
}

export default PostTag
