import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import ReactGA from 'react-ga'

// https://vanja.gavric.org/blog/integrate-google-analytics-with-react-router-v4
class GoogleAnalytics extends Component {
  componentDidMount() {
    this.logPageChange(this.props.location.pathname, this.props.location.search)
  }

  componentDidUpdate({ location: prevLocation }) {
    const {
      location: { pathname, search }
    } = this.props
    const isDifferentPathname = pathname !== prevLocation.pathname
    const isDifferentSearch = search !== prevLocation.search

    if (isDifferentPathname || isDifferentSearch) {
      this.logPageChange(pathname, search)
    }
  }

  logPageChange(pathname, search = '') {
    const page = pathname + search
    const { location } = window

    // https://github.com/nfl/react-helmet/issues/189#issuecomment-336292754
    // Forcing to run after the current event loop is completed
    setTimeout(() => {
      ReactGA.set({
        page,
        location: `${location.origin}${page}`,
        ...this.props.options
      })
      ReactGA.pageview(page)
    }, 0)
  }

  render() {
    return null
  }
}

GoogleAnalytics.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  options: PropTypes.object
}

const RouteTracker = () => <Route component={GoogleAnalytics} />

const init = (options = {}) => {
  const isGAEnabled = !!process.env.REACT_APP_GOOGLE_ANALYTICS_UA

  if (isGAEnabled) {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_UA, {
      debug: process.env.REACT_APP_GOOGLE_ANALYTICS_DEBUG === 'true',
      ...options
    })
  }

  return isGAEnabled
}

export default {
  GoogleAnalytics,
  RouteTracker,
  init
}
