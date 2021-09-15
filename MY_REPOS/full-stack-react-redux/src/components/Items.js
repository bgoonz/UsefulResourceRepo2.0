import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { breakpoints } from '@xstyled/system'
import styled, { css, useUp } from '@xstyled/emotion'

const ItemsStyled = styled.div`
  width: 100%;
`

const ItemLink = styled(Link)`
  display: block;
  text-decoration: none;
  margin: 10px 0;
  color: text;
  & h1 {
    transition: all 0.2s ease-in-out;
  }
  &:hover h1 {
    color: primary;
  }
`

const Item = styled.div`
  display: flex;
  overflow: hidden;
  border-width: 3px;
  border-style: solid;
  border-color: backgroundAlt;
  background-color: background;
  transition: all 0.2s ease-in-out;
  &:hover {
    border-color: primary;
  }
  p {
    margin-bottom: 0;
  }
  ${breakpoints({
    xs: css`
      flex-direction: column;
    `,
    md: css`
      flex-direction: row;
    `
  })}
`

const ItemInfo = styled.div`
  padding: 20px;
  display: flex;

  ${breakpoints({
    xs: css`
      flex-direction: row;
      align-items: center;
    `,
    md: css`
      flex-direction: column;
      align-items: flex-start;
    `
  })}
`

const ItemImage = styled(LazyLoadImage)`
  object-fit: cover;
  ${breakpoints({
    xs: css`
      width: 100%;
      max-height: 300px;
    `,
    md: css`
      width: 200px;
      height: 100%;
    `
  })}
`

const ItemTitle = styled.h1`
  color: text;
  margin: 0;
  ${breakpoints({
    xs: css`
      font-size: 1.5em;
    `,
    md: css`
      font-size: 2em;
    `
  })}
`

const ItemHTML = styled.div`
  color: text;
  p {
    font-size: 1em;
  }
`

const Items = ({ items }) => {
  const desktop = useUp('md')

  const htmlParserTransform = (node, index) => {
    if (node.type === 'tag' && node.name === 'a') {
      return node.children[0].data
    }
  }

  return (
    <ItemsStyled>
      {items.map((item, index) => {
        return (
          <ItemLink key={index} to={`/items/${item.slug}`}>
            <Item>
              <ItemImage
                effect='opacity'
                src={item.imageUrl}
                alt={item.title}
              />
              <ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                {desktop && (
                  <ItemHTML>
                    {ReactHtmlParser(item.html.substr(0, 200) + '…', {
                      transform: htmlParserTransform
                    })}
                  </ItemHTML>
                )}
              </ItemInfo>
            </Item>
          </ItemLink>
        )
      })}
    </ItemsStyled>
  )
}

Items.propTypes = {
  items: PropTypes.array.isRequired
}

export default Items
