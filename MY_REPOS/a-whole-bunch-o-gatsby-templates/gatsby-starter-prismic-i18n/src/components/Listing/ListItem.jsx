import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Categories from './Categories'
import LocalizedLink from '../LocalizedLink'

const Item = styled.li`
  margin-bottom: 1.45rem;
`

const Headline = styled.p`
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${props => props.theme.colors.grey};
  margin-bottom: 0;
  a {
    color: ${props => props.theme.colors.grey};
    font-style: normal;
    font-weight: normal;
  }
`

const StyledLink = styled(LocalizedLink)`
  font-size: 2.369rem;
  color: ${props => props.theme.colors.black};
  font-style: normal;
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.777rem;
  }
`

const ListItem = ({ node, categories }) => (
  <Item>
    <Headline>
      {node.data.date} — {categories && <Categories categories={categories} />}
    </Headline>
    <StyledLink to={`/${node.uid}`}>{node.data.title.text}</StyledLink>
  </Item>
)

export default ListItem

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
}
