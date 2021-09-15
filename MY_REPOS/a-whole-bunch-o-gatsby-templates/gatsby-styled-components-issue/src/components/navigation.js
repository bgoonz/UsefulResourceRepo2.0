import React from 'react'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

import NavigationContainer from '../theme/navigation'

export default function Navigation() {
  return (
    <Location>
      {({ location }) => (
        <NavigationContainer isOnHome={location.pathname === '/'}>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
              <Link to={`/about`}>About</Link>
            </li>
          </ul>
        </NavigationContainer>
      )}
    </Location>
  )
}
