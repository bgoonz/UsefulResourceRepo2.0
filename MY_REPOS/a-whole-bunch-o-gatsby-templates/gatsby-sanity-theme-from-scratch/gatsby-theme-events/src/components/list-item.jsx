/** @jsx jsx */
import React from 'react'
import { Styled, Flex, jsx } from 'theme-ui'

const ListItem = ({ event }) => {
  return (
    <React.Fragment>
      <Styled.h3>{event.name}</Styled.h3>
      <Flex sx={{ variant: `listItem.subline` }}>
        <div>{event.location}</div>
        <div>{new Date(event.date).toDateString()}</div>
      </Flex>
      <Styled.p>{event.description}</Styled.p>
      <Styled.a href={event.externalLink}>{event.externalLink}</Styled.a>
    </React.Fragment>
  )
}

export default ListItem
