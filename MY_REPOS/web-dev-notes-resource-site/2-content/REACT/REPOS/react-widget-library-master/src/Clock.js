import React from 'react'


class Clock extends React.Component {
  constructor() {
    super()

    this.state = {
      time: new Date()
    }

  }

  tick = () => {
    this.setState({
      time: new Date()
    })
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <h1>Clock</h1>
        <p>
          <span>Time:</span>
          <span>{this.state.time.getHours()}:{this.state.time.getMinutes()}:{this.state.time.getSeconds()}</span>
        </p>
      </>
    )
  }
}

export default Clock;
