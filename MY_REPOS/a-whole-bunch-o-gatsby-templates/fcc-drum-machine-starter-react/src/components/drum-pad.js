import React, { Component } from 'react';

export default class DrumPad extends Component {
  render() {
    return (
      <div id={`drum-pad-${this.props.id}`} className="drum-pad" onClick={(e) => this.props.callback(e, this.props.id)}>
        <audio id={this.props.id} className="clip" src={this.props.url} />
        {this.props.id}
      </div>
    )
  }
}
