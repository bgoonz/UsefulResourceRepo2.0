import React from 'react'
import styled from 'styled-components'

const UL = styled.ul`
  list-style: none;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  ul {
    padding-left: 10px;
  }
`

const TagsTree = ({ tags }) => (
  <UL>
    {tags.map(t => (
      <li key={t.id}>
        {t.name}
        {t.tags && <TagsTree tags={t.tags} />}
      </li>
    ))}
  </UL>
)

export default TagsTree
