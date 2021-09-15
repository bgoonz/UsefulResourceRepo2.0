import React from 'react'
import PropTypes from 'prop-types'

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import anOldHope from 'react-syntax-highlighter/dist/cjs/styles/hljs/an-old-hope'

SyntaxHighlighter.registerLanguage('javascript', javascript)

const SyntaxBlock = ({ data }) => {
  return (
    <SyntaxHighlighter
      language='json'
      style={anOldHope}
      showLineNumbers
      showInlineLineNumbers
    >
      {JSON.stringify(data, null, 2)}
    </SyntaxHighlighter>
  )
}

SyntaxBlock.propTypes = {
  data: PropTypes.any
}

export default SyntaxBlock
