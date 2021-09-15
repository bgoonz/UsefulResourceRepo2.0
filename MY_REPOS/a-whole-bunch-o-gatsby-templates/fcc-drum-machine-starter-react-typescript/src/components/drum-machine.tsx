import React, { Component } from 'react';

import { DrumPadInfo } from '../_domain/drum-pad-info-list';
import DrumPad from './drum-pad';

interface DrumMachineProps {
  drumPadInfoList: DrumPadInfo[];
}

interface DrumMachineStateProps {
  displayText: string;
}

export default class DrumMachine extends Component<DrumMachineProps, DrumMachineStateProps> {
  constructor(props: DrumMachineProps) {
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

  keydownHandler(e: KeyboardEvent) {
    const key = e.key.toUpperCase();
    if (this.props.drumPadInfoList.find(pad => pad.id === key)) {
      this.drumPadClick(key)
    }
  }

  drumPadClick(id: string) {
    const clickedPad = this.props.drumPadInfoList.find(pad => pad.id === id);
    const text = clickedPad ? clickedPad.label : '';
    const audioElement = document.getElementById(id) as HTMLAudioElement;
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
      this.setState({
        displayText: text
      });
    }
  }

  render(): JSX.Element {
    const mappedDrumPadList = this.props.drumPadInfoList.map((pad, i) =>
      <DrumPad key={i} id={pad.id} url={pad.url} callback={this.drumPadClick} />
    );

    return (
      <div id="drum-machine" >
        <div id="display" > {this.state.displayText} </div>
        {mappedDrumPadList}
      </div>
    )
  }
}
