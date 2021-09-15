import React, { Component } from 'react';
import DrumPad from './drum-pad';

export default class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: ''
    }
    this.drumPadClick = this.drumPadClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler.bind(this))
  }

  keydownHandler(e) {
    const key = e.key.toUpperCase();
    if (this.props.drumPadList.find(pad => pad.id === key)) {
      this.drumPadClick(e, key)
    }
  }

  drumPadClick(e, id) {
    const clickedPad = this.props.drumPadList.find(pad => pad.id === id);
    const text = clickedPad ? clickedPad.label : '';
    const audioElement = document.getElementById(id);
    audioElement.currentTime = 0;
    audioElement.play();
    this.setState({
      displayText: text
    });
  }

  render() {
    const mappedDrumPadList = this.props.drumPadList.map((pad, i) =>
      <DrumPad key={i} id={pad.id} url={pad.url} callback={this.drumPadClick} />
    );

    return (
      <div id="drum-machine">
        <div id="display">{this.state.displayText}</div>
        {mappedDrumPadList}
      </div>
    )
  }
}
