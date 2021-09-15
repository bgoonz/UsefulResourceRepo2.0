import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

import { Avatar } from '../components'

const UserStyled = styled.div`
  display: flex;
  padding: 15px;
  background-color: background;
  border-width: 3px;
  border-style: solid;
  border-radius: 5px;
  border-color: backgroundAlt;
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

const User = ({ user, isYou }) => {
  return (
    <UserStyled>
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
    </UserStyled>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  isYou: PropTypes.bool
}

export default User
