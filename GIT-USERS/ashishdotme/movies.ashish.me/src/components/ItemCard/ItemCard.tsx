import * as React from 'react'
import * as _ from 'lodash'
import Moment from 'react-moment'
import { Card } from 'ashishdotme-ui/components/card'
import { Movie } from '../../core/models/movie'

const getViewingDate = (date: string) => {
  return (
    <span>
      Watched on <Moment format='DD/MM/YYYY'>{date}</Moment>
    </span>
  )
}

const ItemCards = (props: { results: Movie[] }) => {
  return (
    <>
      {props.results &&
        props.results.map((item) => (
          <Card
            key={item.id.toString()}
            headline={item.title}
            leftSubtitle={item.year}
            rightSubtitle={item.imdbRating}
            title={getViewingDate(item.viewingDate)}
            tags={item.genre}
          >
            <span>{_.truncate(item.description, { length: 180 })}</span>
          </Card>
        ))}
    </>
  )
}
export default ItemCards
