import * as React from "react"
import Header from "./header"
import Spacer from "./spacer"
import Footer from "./footer"

const Wrapper = ({ children }) => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <title>Getting Started with Gatsby - Webinar</title>
      <Header />
      <Spacer />
      {children}
      <Spacer size="lg" />
      <Footer />
    </div>
  )
}

export default Wrapper
