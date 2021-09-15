// ./src/index.js
import React from 'react'
import ReactDOM from 'react-dom';
import RandomQuote from './RandomQuote';
// Re-assign our array here and pass it in as a prop in Render.
const quotes = [
      "May the Force be with you.",
      "There's no place like home.",
      "I'm the king of the world!",
      "My mama always said life was like a box of chocolates.",
      "I'll be back.",
      "This way I can define more quotes",
    ];
ReactDOM.render(
  <React.StrictMode>
    <RandomQuote quotes={quotes}/>
  </React.StrictMode>
  document.getElementById('root');
)