import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { AnimatePresence } from 'framer-motion'
import { Switch, Route } from 'react-router-dom'

import { history } from '../redux/store'
import { ScrollToTop, GoogleAnalytics } from '../containers'
import {
  PageAbout,
  PageDebug,
  PageHome,
  PageItem,
  PageItems,
  PageLogin,
  PageLogout,
  PageNotFound,
  PageRegister,
  PageSearch,
  PageUsers,
  PageUserSettings,
  PageUserProfile,
  PageUpload
} from '../pages'

const RouterContainer = () => {
  return (
    <ConnectedRouter history={history}>
      <>
        <ScrollToTop />

        {GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker />}

        <AnimatePresence>
          <Switch>
            {process.env.NODE_ENV === 'development' && (
              <Route path='/debug' component={PageDebug} />
            )}
            {process.env.NODE_ENV === 'development' && (
              <Route path='/upload' component={PageUpload} />
            )}

            <Route exact path='/' component={PageHome} />
            <Route path='/about' component={PageAbout} />
            <Route path='/users' component={PageUsers} />
            <Route exact path='/items' component={PageItems} />
            <Route path='/items/:slug' component={PageItem} />
            <Route path='/search' component={PageSearch} />
            <Route path='/register' component={PageRegister} />
            <Route path='/login' component={PageLogin} />
            <Route path='/logout' component={PageLogout} />
            <Route path='/settings' component={PageUserSettings} />
            <Route path='/:slug' component={PageUserProfile} />
            <Route key={'/404.html'} component={PageNotFound} />
          </Switch>
        </AnimatePresence>
      </>
    </ConnectedRouter>
  )
}

export default RouterContainer
