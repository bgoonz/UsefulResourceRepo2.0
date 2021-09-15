import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import styled from '@xstyled/emotion'

const ItemsResultsStyled = styled.div``

const ItemsResults = ({ items }) => {
  return (
    <ItemsResultsStyled>
      {items.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <div>{ReactHtmlParser(item.html)}</div>
        </div>
      ))}
    </ItemsResultsStyled>
  )
}

ItemsResults.propTypes = {
  items: PropTypes.array.isRequired
}

export default ItemsResults
