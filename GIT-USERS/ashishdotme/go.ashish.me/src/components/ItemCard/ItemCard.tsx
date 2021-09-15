import * as React from 'react'
import Moment from 'react-moment'
import { Link } from '../../core/models/link'

const getViewingDate = (date: string) => {
  return (
    <small>
      Created on <Moment format='dddd, MMMM Do YYYY'>{date}</Moment>
    </small>
  )
}

const ItemCards = (props: { results: Link[] }) => {
  return (
    <>
      {props.results &&
        props.results.map((item) => (
          <div className='box'>
            <article className='media'>
              <div className='media-left'>
                <p className='title is-4 has-text-centered'>
                  <span className='tag is-large is-info has-margin-right-5'>{item.hits}</span>
                  <p className='subtitle is-6 m-t-xs'> Hits</p>
                </p>
              </div>
              <div className='media-content'>
                <div className='content'>
                  <a
                    target='_blank'
                    href={`https://go.ashish.me/#${item.hash}`}
                    rel='noopener noreferrer'
                  >{`go.ashish.me/#${item.hash}`}</a>
                  <p className='has-text-grey-light'>
                    <small>{item.url}</small>
                    <br />
                    {getViewingDate(item.createdAt)}
                  </p>
                </div>
              </div>
            </article>
          </div>
        ))}
    </>
  )
}
export default ItemCards
