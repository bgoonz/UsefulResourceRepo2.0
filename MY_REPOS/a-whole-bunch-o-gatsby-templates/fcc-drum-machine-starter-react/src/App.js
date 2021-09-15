import React, { Component } from 'react';
import './App.css';
import DrumMachine from './components/drum-machine';
import { drumPadList } from './_domain/drum-pad-list';

export default class App extends Component {
  render() {
    return (
      <DrumMachine drumPadList={drumPadList}/>
    );
  }
}
