import React from "react"
import Typist from 'react-typist'

const Button = ({ children }) => {
  return (
    <Typist>
      {children}
    </Typist>
  )
}

export default Button
