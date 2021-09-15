import React from 'react'
import Navigation from './navigation'
import Footer from './footer'

export default function Layout(props) {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}
