import React, { Component } from 'react';
import axios from 'axios';
import Dynamic from './chart.js';

export class Graph extends Component {
  state = {
    day_kwh: [],
    night_kwh: [],
    usage: [],
    gas: [],
  }

  async componentDidMount() {
    const data = this.state;

    const res = await axios.get('/api/data');
    if (res.data !== undefined) {
      return res.data.map(x => {
        Object.entries(x).map(y => {
          return data[y[0]] !== undefined && data[y[0]].push(Number([y[1]].join('').slice(0, -4)))
        })
      })
    }

    const { day_kwh, night_kwh, usage, gas } = data;
    this.setState({ day_kwh, night_kwh, usage, gas });
  }

  render() {
    return <Dynamic data={this.state} />  
  }
}