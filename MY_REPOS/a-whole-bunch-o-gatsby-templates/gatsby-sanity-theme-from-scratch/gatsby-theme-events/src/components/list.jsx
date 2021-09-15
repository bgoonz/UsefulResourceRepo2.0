/** @jsx jsx */
import { Styled, jsx } from 'theme-ui'
import ListItem from './list-item'
import sortEvents from '../utils/sort-events'

const List = ({ events }) => {
  const { upcoming, past } = sortEvents(events)

  return (
    <section sx={{ variant: `list.default` }}>
      <Styled.h2>Upcoming Events</Styled.h2>
      <ul>
        {upcoming.map((event) => (
          <li key={event.name}>
            <ListItem event={event} />
          </li>
        ))}
      </ul>
      <Styled.h2>Past Events</Styled.h2>
      <ul>
        {past.map((event) => (
          <li key={event.name}>
            <ListItem event={event} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default List
