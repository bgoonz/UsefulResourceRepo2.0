import React from "react"
import { Link } from "gatsby"
import { useTheme } from "emotion-theming"

export default function Home() {
  const theme = useTheme()
  return (
    <div>
      <h1>Hello World</h1>
      <p>
        <Link to="/homepage">Homepage</Link>
      </p>
      <p>
        <Link to="/business">Business</Link>
      </p>
      <h2>Theme</h2>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </div>
  )
}
