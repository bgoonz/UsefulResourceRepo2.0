import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

import { ColorModeToggle } from '../containers'
import { LinkButton, LinkAnchor, LinkAvatar } from '../components'
import { IconBug, IconImage, IconNone } from '../components/icons'

const HeaderDesktopStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 1080px;
`

const HeaderSegment = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 15px;
  }
`

const HeaderSegmentButtons = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-left: 10px;
  }
`

const Logo = styled.span`
  display: flex;
  align-items: center;
  transition: inherit;
  opacity: 1;
  margin-right: 10px;
  &:hover {
    opacity: 0.8;
  }
`

const LogoImage = styled.img`
  height: 40;
`

const LogoText = styled.span`
  font-size: 1.2em;
  font-weight: 700;
  color: secondary;
  margin: 0 10px;
`

const Header = ({ isAuthenticated, authenticatedUser }) => {
  return (
    <HeaderDesktopStyled>
      <HeaderSegment>
        <LinkAnchor to='/'>
          <Logo>
            <LogoImage src='/assets/images/icon.svg' alt='Logo' />
            <LogoText>Template</LogoText>
          </Logo>
        </LinkAnchor>

        {process.env.NODE_ENV === 'development' && (
          <>
            <LinkAnchor to='/upload'>
              <IconImage />
            </LinkAnchor>
            <LinkAnchor to='/debug'>
              <IconBug />
            </LinkAnchor>
            <LinkAnchor to='/not-found'>
              <IconNone />
            </LinkAnchor>
          </>
        )}
        <LinkAnchor to='/about'>About</LinkAnchor>
        <LinkAnchor to='/users'>Users</LinkAnchor>
        <LinkAnchor to='/items'>Items</LinkAnchor>
        <LinkAnchor to='/search'>Search</LinkAnchor>
      </HeaderSegment>

      <HeaderSegmentButtons>
        <ColorModeToggle />

        {!isAuthenticated && (
          <>
            <LinkButton variant='secondary' to='/login'>
              Login
            </LinkButton>
            <LinkButton variant='primary' to='/register'>
              Register
            </LinkButton>
          </>
        )}

        {isAuthenticated && authenticatedUser.username && (
          <>
            <LinkAvatar
              to={`/${authenticatedUser.username}`}
              user={authenticatedUser}
            />
            <LinkButton to='/logout'>Logout</LinkButton>
          </>
        )}
      </HeaderSegmentButtons>
    </HeaderDesktopStyled>
  )
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authenticatedUser: PropTypes.object
}

export default Header
