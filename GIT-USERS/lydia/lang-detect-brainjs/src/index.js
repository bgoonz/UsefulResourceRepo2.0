import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import brain from 'brain.js';
import { Button, Input } from 'react-materialize'

import { TRAINING_DATA } from './data';
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      value: '',
      output: 'Default',
      loaded: null
    };
  }

  trainedNet;

  handleChange = e => this.setState({ value: e.target.value })
  
  encode = arg => arg.split('').map(x => (x.charCodeAt(0) / 255));
  
  processTrainingData = data => (
    data.map(d => ({
      input: this.encode(d.input),
      output: d.output
    }))
  );
  
  train = data => {
     let net = new brain.NeuralNetwork();
     net.train(this.processTrainingData(data));
     this.trainedNet = net.toFunction();
     return 'done'
  };
  
  execute = input => {
    let results = this.trainedNet(this.encode(input));
    let max = Math.max(...Object.values(results));
    let values = Object.entries(results);
    let output = results !== isNaN && values.filter(x => x.includes(max))[0][0];
    this.setState({ output });
  };

  startTraining = async () => {
    this.setState({ loaded: false })
    let res = await this.train(TRAINING_DATA)
    res === 'done' && this.setState({ loaded: true })
  };

  render() {
    const { value, output, loaded } = this.state;
    return (
      <div className='App'>
        { !loaded ?
          <Button 
            waves='light' 
            onClick={ () => this.startTraining() }>
            Start training (this could take a while)
          </Button> :
          <React.Fragment>
            <Input type='text' onChange={ e => this.handleChange(e) } value={ value } />
            <Button onClick={() => this.execute(this.state.value)}>Check language!</Button>
            <p>{output}</p>
          </React.Fragment>
        }
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));