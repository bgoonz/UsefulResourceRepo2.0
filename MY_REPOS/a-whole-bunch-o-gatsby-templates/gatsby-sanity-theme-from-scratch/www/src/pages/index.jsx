/** @jsx jsx */
import { Flex, jsx, Styled } from 'theme-ui'
import { graphql, Link } from 'gatsby'
import sortEvents from 'gatsby-theme-events/src/utils/sort-events'
import Layout from '../components/layout'

export default ({ data: { allSanityEvent } }) => {
  const { upcoming } = sortEvents(allSanityEvent.nodes)

  const nextEvent = upcoming[0]

  return (
    <Layout>
      <Styled.h1>Welcome to Meetup!</Styled.h1>
      <Styled.p>
        This meetup is for anyone interested in anything on the web. We organise
        talks, workshops, coding nights, and social events. We also encourage,
        support, and help community members, especially those underrepresented
        in tech, contribute with their own content. If you're interested in
        giving talks please let us know!
      </Styled.p>
      <Styled.p>The next upcoming event will be:</Styled.p>
      <div sx={{ p: 3, bg: `primaryMuted` }}>
        <Styled.h2>{nextEvent.name}</Styled.h2>
        <Flex sx={{ variant: `listItem.subline` }}>
          <div>{nextEvent.location}</div>
          <div>{new Date(nextEvent.date).toDateString()}</div>
        </Flex>
        <Styled.p>{nextEvent.description}</Styled.p>
      </div>
      <Styled.p>
        You can find all upcoming and past events here:{' '}
        <Styled.a as={Link} to="/events">
          Events
        </Styled.a>
      </Styled.p>
    </Layout>
  )
}

export const query = graphql`
  query {
    allSanityEvent {
      nodes {
        location
        name
        description
        date
      }
    }
  }
`
