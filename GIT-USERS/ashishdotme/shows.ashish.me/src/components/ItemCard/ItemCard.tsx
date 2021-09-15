import * as React from 'react'
import * as _ from 'lodash'
import Moment from 'react-moment'
import { Card } from 'ashishdotme-ui/components/card'
import { Show } from '../../core/models/show'

const getCompletedDate = (date: string) => {
  return (
    <span>
      Completed on <Moment format='DD/MM/YYYY'>{date}</Moment>
    </span>
  )
}

const ItemCards = (props: { results: Show[] }) => {
  return (
    <>
      {props.results &&
        props.results.map((item) => (
          <Card
            key={item.id.toString()}
            headline={item.title}
            leftSubtitle={item.year}
            rightSubtitle={item.imdbRating}
            title={getCompletedDate(item.completedDate)}
            tags={item.genre}
          >
            <span>{_.truncate(item.description, { length: 180 })}</span>
          </Card>
        ))}
    </>
  )
}
export default ItemCards
