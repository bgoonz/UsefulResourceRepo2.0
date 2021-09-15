import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

import { LinkAnchor, MenuMobile } from '../components'

const HeaderMobileStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 5px 10px 10px;
`

const Segment = styled.div``

const SegmentButtons = styled.div`
  & > a {
    margin-left: 10px;
  }
`

const Logo = styled.span`
  display: flex;
  align-items: center;
  transition: inherit;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`

const LogoImage = styled.img`
  height: 30px;
`

const LogoText = styled.span`
  font-size: 1.2em;
  font-weight: 700;
  color: secondary;
  margin: 0 5px;
`

const MenuButton = styled.button`
  cursor: pointer;
  font-weight: 900;
  background-color: backgroundAlt;
  color: #fff;
  padding: 5px;
  border: none;
  border-radius: 0;
  color: text;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: textAlt;
  }
  span {
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const HeaderMobile = ({ isAuthenticated, authenticatedUser }) => {
  const [isMenuActive, setIsMenuActive] = useState(false)

  const changeIsMenuActive = () => {
    setIsMenuActive(!isMenuActive)
  }

  return (
    <HeaderMobileStyled>
      <Segment>
        <LinkAnchor to='/'>
          <Logo>
            <LogoImage src='/assets/images/icon.svg' alt='Logo' />
            <LogoText>Template</LogoText>
          </Logo>
        </LinkAnchor>
      </Segment>

      <SegmentButtons>
        <MenuButton
          id='menu-button'
          role='menu'
          variant='transparent'
          onClick={changeIsMenuActive}
        >
          <span>{isMenuActive ? '✕' : '☰'}</span>
        </MenuButton>

        <MenuMobile
          isActive={isMenuActive}
          isAuthenticated={isAuthenticated}
          authenticatedUser={authenticatedUser}
        />
      </SegmentButtons>
    </HeaderMobileStyled>
  )
}

HeaderMobile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authenticatedUser: PropTypes.object
}

export default HeaderMobile
