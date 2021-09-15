import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

import { SyntaxBlock } from '../components'

const DebugStyled = styled.div`
  font-size: 1.2em;
  width: 100%;
  pre {
    border-radius: 5px;
    white-space: pre-wrap;
  }
`

const Debug = ({ data }) => {
  return (
    <DebugStyled>
      {process.env.NODE_ENV === 'development' ? (
        <SyntaxBlock data={data} />
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </DebugStyled>
  )
}

Debug.propTypes = {
  data: PropTypes.any
}

export default Debug
