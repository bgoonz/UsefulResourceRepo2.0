import React from 'react'
import styled from 'styled-components/macro'
import Link from 'redux-first-router-link'

import 'tachyons/css/tachyons.css'
import './App.css'

import TagsGraph from './TagsGraph'
import TagsTree from './TagsTree'
import PersonsList from './PersonsList'

import Dev from './Dev'
import Person from './Person'

import PadH from 'App/PadH'

import ColTitle from './ColTitle'

const Col = styled.section`
  min-width: 175px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  height: calc(100vh - 140px);
  width: 100vw;

  > ${Col} {
    border-right: 1px dashed #aaa;
  }
  ${Col}:nth-of-type (1) {
    grid-column: 1;
  }
  ${Col}:nth-of-type (2) {
    grid-column: 2;
  }
  ${Col}:nth-of-type (3) {
    grid-column: 3;
  }
`

const App = ({ page }) => (
  <>
    <Link to={page === 'DEV' ? '/' : '/dev'}>
      <TagsGraph />
    </Link>

    {page === 'DEV' ? (
      <Dev />
    ) : (
      <Grid>
        <Col>
          <ColTitle>Tags</ColTitle>
          <PadH>
            <TagsTree />
          </PadH>
        </Col>

        <Col>
          <ColTitle>Persons</ColTitle>
          <PersonsList />
        </Col>

        {page === 'PERSON' && (
          <Col>
            <Person />
          </Col>
        )}
      </Grid>
    )}
  </>
)

export default App
