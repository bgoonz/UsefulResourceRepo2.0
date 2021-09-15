import React from 'react'

import HomeContainer from '../theme/home'

export default function Home() {
  return (
    <HomeContainer>
      <h1>This is a homepage</h1>
      <p>The navigation above should be red</p>
      <p className="diff">This paragraph should differ from the one above</p>
    </HomeContainer>
  )
}
