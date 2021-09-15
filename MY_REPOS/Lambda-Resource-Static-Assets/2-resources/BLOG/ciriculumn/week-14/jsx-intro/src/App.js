import React from 'react';
import { num1, num2 } from './Imports';
import add from './Imports';
import Div from './Div';
import Composition from './Composition';
import List from './List';
import './App.css';

function App() {
  let random = Math.floor(Math.random() * 10);
  let name = { firstName: 'JD', lastName: 'Richards' };
  let fruits = ['apple', 'banana', 'pear', 'orange'];
  return (
    <div className="container">
      <List fruits={fruits} />
      <Composition>
        <h1>
          Hello React. My name is {name.firstName} {name.lastName}
        </h1>
        <p>This is my first project</p>
      </Composition>
      <p>{add(num1, num2)}</p>
      <p>Random number: {random}</p>
      <Div color="green" background="yellow" name={name} />
      <Div color="red" background="white" />
      <Composition>
        <Div color="white" background="orange" />
      </Composition>
    </div>
  );
}

export default App;
