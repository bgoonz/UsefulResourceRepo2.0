import React from 'react'

import AboutContainer from '../theme/about'

export default function Home() {
  return (
    <AboutContainer>
      <h1>This is an about page</h1>
      <p>
        The navigation above *should* be blue. However, if you navigate directly to /about without
        first hitting the index, the styling will not load.
      </p>
      <p className="diff">
        Yet, styling for the page itself will still load, as evidenced by this paragraph
      </p>
    </AboutContainer>
  )
}
