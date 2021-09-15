import React, { Component } from 'react'

import './TagsGraph.css'
import * as d3 from 'd3-bundle'

const renderLine = () => {
  const data = [[0, 50], [100, 80], [200, 40], [300, 60], [400, 30], [600, 0]]
  const lineGenerator = d3.line()
  const pathString = lineGenerator(data)
  d3.select('path').attr('d', pathString)
}

export class TagsGraph extends Component {
  componentDidMount = renderLine

  shouldComponentUpdate = () => false

  render = () => (
    <svg width="600" height="100">
      <path />
    </svg>
  )
}

export default TagsGraph
