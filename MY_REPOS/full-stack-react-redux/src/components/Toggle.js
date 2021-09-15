import React from 'react'
import PropTypes from 'prop-types'
import styled from '@xstyled/emotion'

const ToggleButton = styled.a`
  cursor: pointer;
  background: none;

  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`

const Image = styled.img`
  padding: 2px;
  height: 20px;
`

const icon = {
  light: '/assets/icons/light.svg',
  dark: '/assets/icons/dark.svg'
}

const Toggle = ({ colorMode, onClick }) => {
  return (
    <ToggleButton onClick={onClick}>
      <Image
        alt='Color Mode'
        src={colorMode === 'dark' ? icon.light : icon.dark}
      />
    </ToggleButton>
  )
}

Toggle.propTypes = {
  colorMode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Toggle
