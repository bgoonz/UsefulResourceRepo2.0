import { NavLink } from 'redux-first-router-link'
import React from 'react'
import styled from 'styled-components/macro'

import { toPerson } from 'store/routerActions'

const A = styled(NavLink)`
  color: rgba(255, 255, 255, 0.5);
  display: block;
  margin-bottom: 2px;
  padding: 5px 20px;
  text-decoration: none;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 1);
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const PersonsList = ({ persons }) => (
  <List>
    {persons.map(p => (
      <li key={p.id}>
        <A activeClassName="active" to={toPerson({ id: p.id })}>
          {p.name}
        </A>
      </li>
    ))}
  </List>
)

export default PersonsList
