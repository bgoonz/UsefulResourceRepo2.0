import * as React from 'react'

const HeadOfHouse = (props) => (
  <React.Fragment>
    <main>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </main>
  </React.Fragment>
)

export default HeadOfHouse
