import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const Insta = ({ caption, timestamp, image }) => {
  const title = caption ? caption.split("#")[0] : ""
  const date = new Date(timestamp * 1000).toLocaleDateString(`en-GB`)

  return (
    <Link to={`/instagram/${timestamp}/`} style={{ textDecoration: "none" }}>
      <GatsbyImage image={image} alt={title} />
      <div className="flex justify-between items-center" style={{ minHeight: "36px" }}>
        {title && <div>{title}</div>}
        <div className="text-gray-600 text-sm">{date}</div>
      </div>
    </Link>
  )
}

export default Insta
