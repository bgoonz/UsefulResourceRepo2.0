import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { breakpoints } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'

const ItemDetailStyled = styled.div`
  max-width: 720px;
`

const ItemImageContainer = styled.div``

const ItemImage = styled.img`
  object-fit: cover;
  width: 100%;

  ${breakpoints({
    md: css`
      max-height: 480px;
    `
  })};
`

const ItemContent = styled.div`
  padding: 20px;

  ${breakpoints({
    xs: css`
      padding: 0 20px;
    `,
    md: css`
      padding: 0;
    `
  })};
`

const ItemTitle = styled.h1`
  ${breakpoints({
    xs: css`
      font-size: 1.6em;
    `,
    sm: css`
      font-size: 2.5em;
    `,
    md: css`
      font-size: 3em;
    `
  })};
`

const ItemBody = styled.div`
  ${breakpoints({
    xs: css`
      font-size: 0.9em;
    `,
    sm: css`
      font-size: 1em;
    `
  })};
`

const ItemDetail = ({ item }) => {
  return (
    <ItemDetailStyled>
      <ItemImageContainer>
        <ItemImage effect='opacity' src={item.imageUrl} alt={item.title} />
      </ItemImageContainer>

      <ItemContent>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemBody>{ReactHtmlParser(item.html)}</ItemBody>
      </ItemContent>
    </ItemDetailStyled>
  )
}

ItemDetail.propTypes = {
  item: PropTypes.object.isRequired
}

export default ItemDetail
