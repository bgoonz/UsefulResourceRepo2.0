import Link from 'redux-first-router-link'
import React from 'react'
import styled from 'styled-components'

import ColTitle from 'App/ColTitle'
import PadH from 'App/PadH'
import { toPerson } from 'store/routerActions'

const Table = styled.table`
  text-align: left;
  border-collapse: collapse;
  tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  td,
  th {
    vertical-align: top;
    padding: 10px 0;
  }
  th {
    padding-right: 20px;
    color: rgba(255, 255, 255, 0.6);
  }
`

const FriendsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  a {
    color: rgba(255, 255, 255, 0.5);
    &:hover {
      color: white;
    }
  }
`

const PersonsList = ({ person }) =>
  person ? (
    <>
      <ColTitle>{person.name}</ColTitle>
      <PadH>
        <Table>
          <tr>
            <th>id</th>
            <td>{person.id}</td>
          </tr>

          <tr>
            <th>slug</th>
            <td>{person.slug}</td>
          </tr>
          <tr>
            <th>friends</th>
            <td>
              {person.friends && (
                <FriendsList>
                  {person.friends.map(p => (
                    <li>
                      <Link to={toPerson(p)}>{p.name}</Link>
                    </li>
                  ))}
                </FriendsList>
              )}
            </td>
          </tr>
        </Table>
      </PadH>
    </>
  ) : null

export default PersonsList
