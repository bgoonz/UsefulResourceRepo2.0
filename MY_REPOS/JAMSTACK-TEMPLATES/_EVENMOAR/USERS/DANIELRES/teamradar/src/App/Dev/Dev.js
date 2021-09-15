import React from 'react'
import styled from 'styled-components'

import ColTitle from 'App/ColTitle'
import PadH from 'App/PadH'

const Col = styled.section`
  min-width: 175px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
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
`

const Preview = styled.pre`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  margin: 0;
`

const Button = styled.button.attrs({
  className: 'bg-white-20 br2 dim f6 ph3 pv2 white',
})``

const Dev = ({ preview, resetAndSeedDb }) => (
  <Grid>
    <Col>
      <ColTitle>Dev</ColTitle>
      <PadH>
        <Button onClick={resetAndSeedDb}>Reset & seed db</Button>
      </PadH>
    </Col>
    <Col>{preview && <Preview>{preview}</Preview>}</Col>
  </Grid>
)

export default Dev
