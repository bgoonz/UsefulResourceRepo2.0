import * as React from "react"

const MultipleExports = () => {
  return (
    <main>
      <title>Multiple Exports</title>
      Test
    </main>
  )
}

export default MultipleExports

export function extraExport() {}
