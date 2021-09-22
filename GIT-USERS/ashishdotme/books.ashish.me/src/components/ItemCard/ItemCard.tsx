import * as React from 'react'
import * as _ from 'lodash'
import Moment from 'react-moment'
import { Card } from 'ashishdotme-ui/components/card'
import { Book } from '../../core/models/book'

const getCompeletedDate = (date: string) => {
  return (
    <span>
      Completed on <Moment format='DD/MM/YYYY'>{date}</Moment>
    </span>
  )
}

const ItemCards = (props: { results: Book[] }) => {
  return (
    <>
      {props.results &&
        props.results.map((item) => (
          <Card
            key={item.id.toString()}
            headline={item.title}
            leftSubtitle={item.year}
            rightSubtitle={item.author}
            title={getCompeletedDate(item.completedDate)}
            tags={item.genre}
          >
            <span>{_.truncate(item.description, { length: 180 })}</span>
          </Card>
        ))}
    </>
  )
}
export default ItemCards
