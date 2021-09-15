import * as React from 'react'
import { Router, useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'
import { QueryClient, QueryClientProvider } from 'react-query'
import { persistWithLocalStorage } from 'react-query/persist-localstorage-experimental'
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from '../views/home'
import Settings from '../views/settings'
import Navigation from '../components/navigation'
import NotFoundPage from './404'

const queryClient = new QueryClient()
/**
 * This is an experimental feature that stores the results in localStorage
 * https://react-query.tanstack.com/plugins/persist-localstorage
 * ThrottleTime is the time in ms that the cache is saved to the disk
 */
persistWithLocalStorage(queryClient, { throttleTime: 10000 })

const App = () => {
  const { pathname } = useLocation()
  const isSettingsView = pathname === `/settings`
  const isHomeView = pathname === `/`
  const showDevtools = true

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <body className="bg-white dark:bg-gray-900 min-h-screen text-gray-700 dark:text-gray-300" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <html lang="en-US" />
        <title>
          {isSettingsView ? `Settings - Bare Instagram` : `Bare Instagram`}
        </title>
      </Helmet>
      <Router>
        <NotFoundPage default />
        <Home path="/" />
        <Settings path="/settings" />
      </Router>
      <Navigation isHomeView={isHomeView} />
      {showDevtools && (
        <ReactQueryDevtools
          position="top-right"
          panelProps={{ style: { bottom: '60px' } }}
          toggleButtonProps={{ style: { right: '12px', bottom: 'auto' } }}
          closeButtonProps={{
            style: { right: '12px', bottom: 'auto', top: '6px' },
          }}
        />
      )}
    </QueryClientProvider>
  )
}

export default App
