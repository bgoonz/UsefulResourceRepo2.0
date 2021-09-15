import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

import { ColorModeToggle } from '../containers'
import { LinkAnchor, Avatar } from '../components'

const MenuMobileStyled = styled.ul`
  background-color: backgroundAlt;
  padding: 0;
  border: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  list-style-type: none;
  left: 0;
  right: 0;
  pointer-events: none;
  position: absolute;
  transform: translateY(0);
  opacity: 1;
  transition: all 0.2s ease-in-out;
  z-index: 2;
  box-shadow: boxShadow;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  transform: ${({ isActive }) =>
    isActive ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  li {
    display: flex;
    background-color: backgroundAlt;
    transition: all 0.2s ease-in-out;
  }
  li a {
    text-align: center;
    padding: 15px 20px;
    width: 100%;
    font-weight: 700;
  }
`

const UserName = styled.span`
  margin-left: 10px;
`

const MenuMobile = ({
  isActive = false,
  isAuthenticated,
  authenticatedUser
}) => {
  return (
    <MenuMobileStyled role='menu' isActive={isActive}>
      {!isAuthenticated && (
        <>
          <li>
            <LinkAnchor variant='primary' to='/register'>
              Register
            </LinkAnchor>
          </li>
          <li>
            <LinkAnchor variant='primary' to='/login'>
              Login
            </LinkAnchor>
          </li>
        </>
      )}

      <li>
        <LinkAnchor to='/about'>About</LinkAnchor>
      </li>
      <li>
        <LinkAnchor to='/users'>Users</LinkAnchor>
      </li>
      <li>
        <LinkAnchor to='/items'>Items</LinkAnchor>
      </li>
      <li>
        <LinkAnchor to='/search'>Search</LinkAnchor>
      </li>

      {isAuthenticated && authenticatedUser.username && (
        <li>
          <LinkAnchor to={`/${authenticatedUser.username}`}>
            <Avatar size={24} user={authenticatedUser} />
            <UserName>{authenticatedUser.name}</UserName>
          </LinkAnchor>
        </li>
      )}

      {isAuthenticated && (
        <li>
          <LinkAnchor variant='danger' to='/logout'>
            Logout
          </LinkAnchor>
        </li>
      )}

      <li>
        <ColorModeToggle />
      </li>
    </MenuMobileStyled>
  )
}

MenuMobile.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  authenticatedUser: PropTypes.object
}

export default MenuMobile
