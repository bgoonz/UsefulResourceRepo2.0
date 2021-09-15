import React from "react";
import ReactDOM from "react-dom";
import 'core-js/es6/map';
import 'core-js/es6/set';
import './favicon.ico';
import App from './App';
import './styles.scss';

ReactDOM.render(<App />, document.getElementById('app'));

console.log('process.env.VERSION', process.env.VERSION);
console.log('process.env.PLATFORM', process.env.PLATFORM);
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);