import * as React from "react"
import { useTheme } from "emotion-theming"
import { Link } from "gatsby"

const BlogTemplate = ({ pageContext }) => {
  const theme = useTheme()
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>PageContext</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
      <h2>Theme</h2>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </div>
  )
}

export default BlogTemplate
