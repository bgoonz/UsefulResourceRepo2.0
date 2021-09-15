import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from '@xstyled/emotion'

import { Avatar } from '../components'

const UsersStyled = styled.div`
  width: 100%;
  max-width: 480px;
`

const UserLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: text;
  margin: 10px 0;
`

const User = styled.div`
  display: flex;
  padding: 15px;
  background-color: background;
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: backgroundAlt;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &:hover {
    border-color: primary;
  }
`

const Info = styled.div`
  margin-left: 10px;
`

const SubInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.h1`
  display: flex;
  align-items: flex-start;
  font-weight: 700;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 0.1rem;
`

const Username = styled.span`
  color: secondary;
`

const Bio = styled.span`
  margin-top: 1rem;
`

const Users = ({ users }) => {
  return (
    <UsersStyled>
      {users.map((user, index) => {
        return (
          <UserLink key={index} to={user.username}>
            <User>
              <Avatar user={user} size={50} />
              <Info>
                <SubInfo>
                  <Name>{user.name}</Name>
                  <Username>@{user.username}</Username>
                </SubInfo>
                <SubInfo>
                  <Bio>{user.bio}</Bio>
                </SubInfo>
              </Info>
            </User>
          </UserLink>
        )
      })}
    </UsersStyled>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
