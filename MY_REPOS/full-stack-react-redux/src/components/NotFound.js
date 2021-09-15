import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from '@xstyled/emotion'

import { Hero } from '../components'

const NotFoundStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
  }
`

const NotFound = () => {
  const history = useHistory()

  const goBack = () => history.goBack()

  return (
    <>
      <Hero heading='Sorry, this page is not available' />
      <NotFoundStyled>
        <p>
          The link you followed may be broken, or the page may have been
          removed. This page is often called "404 Not Found"
        </p>
        <p>
          Instead, you can go back to <Link to='/'>homepage</Link> or{' '}
          <a
            href='/'
            onClick={(event) => {
              event.preventDefault()
              goBack()
            }}
          >
            previous page
          </a>
        </p>
      </NotFoundStyled>
    </>
  )
}

export default NotFound
