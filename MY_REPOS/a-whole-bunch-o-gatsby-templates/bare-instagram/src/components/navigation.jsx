import * as React from 'react'
import { Link } from '@reach/router'
import useScrollDirection from '../hooks/use-scroll'

const Navigation = ({ isHomeView }) => {
  const scrollDir = useScrollDirection()
  const showHideNav =
    scrollDir === `down`
      ? `translate3d(0px, 61px, 0px)`
      : `translate3d(0px, 0px, 0px)`

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 flex flex-row flex-nowrap justify-around bg-white bg-opacity-80 border-gray-100 border-t dark:bg-gray-800 dark:border-gray-800"
      style={{
        height: '61px',
        transform: isHomeView ? showHideNav : undefined,
        transition: `all 0.3s ease-in-out`,
      }}
    >
      <Link
        to="/"
        className="flex-1 text-center pt-3 pb-6 text-black dark:text-white tracking-wider border-r border-gray-300 dark:border-gray-600"
      >
        Home
      </Link>
      <Link
        to="settings"
        className="flex-1 text-center pt-3 pb-6 text-black dark:text-white tracking-wider"
      >
        Settings
      </Link>
    </nav>
  )
}

export default Navigation
