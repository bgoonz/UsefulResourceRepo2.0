import * as React from "react"

function sizes(size) {
  switch (size) {
    case "sm":
      return `my-4 flex`
    case "md":
      return `my-6 flex`
    case "lg":
      return `my-8 flex`
    default:
      return `my-6 flex`
  }
}

const Spacer = ({ size }) => {
  return <div className={sizes(size)} />
}

export default Spacer
