import * as React from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends React.Component {
  public render() {
    return (
      <section className='hero is-light is-fullheight has-text-white'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <p className='title'>🚫 404</p>
            <p className='subtitle has-text-centered'>
              Click{' '}
              <Link style={{ borderBottom: '1px dotted black' }} to='/'>
                here
              </Link>{' '}
              to go back to the home page.
            </p>
          </div>
        </div>
      </section>
    )
  }
}
