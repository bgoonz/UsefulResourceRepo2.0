import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const AvatarImageContainer = styled.div`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  margin: 0;
`

const AvatarImage = styled.img`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  transition: all 0.2s ease-in-out;
  background-color: background;
  object-fit: cover;
  box-sizing: border-box;
  border-style: solid;
  border-color: backgroundAlt;
  border-width: 2px;
  border-radius: 50%;
`

const Avatar = ({ user, size = 150 }) => {
  return (
    <AvatarImageContainer size={size}>
      <AvatarImage src={user.avatarUrl} alt={user.name} size={size} />
    </AvatarImageContainer>
  )
}

Avatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.number
}

export default Avatar
