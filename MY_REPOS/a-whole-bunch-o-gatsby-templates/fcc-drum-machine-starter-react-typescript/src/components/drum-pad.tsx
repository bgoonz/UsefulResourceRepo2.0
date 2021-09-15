import React, { Component } from 'react';

interface DrumPadProps {
  id: string;
  url: string;
  callback: (id: string) => void
}

export default class DrumPad extends Component<DrumPadProps> {
  constructor(props: DrumPadProps) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.callback(this.props.id)
  }

  render(): JSX.Element {
    return (
      <div id={`drum-pad-${this.props.id}`} className="drum-pad" onClick={this.clickHandler}>
        <audio id={this.props.id} className="clip" src={this.props.url} />
        {this.props.id}
      </div>
    )
  }
}
