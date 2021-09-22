import logo from './logo.svg';
import axios from 'axios';
import {useState} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({})
  const initGame = () => {
    axios.get('http://127.0.0.1:8000/api/adv/init/', {
  headers: {
    'Authorization': 'Token 0db5aff89cef50ae0ba713e045da1825c84159d5',
  }}).then(function (res) {
    console.log(res.data.title)
    setData(res.data)
})
  }

  const moveNorth = (e) => {
    
    axios.post('http://127.0.0.1:8000/api/adv/move/', {'direction': "n"},
    {
  headers: {
    'Authorization': 'Token 0db5aff89cef50ae0ba713e045da1825c84159d5',
  }
  }).then(function (res) {
    console.log(res.data.title)
    setData(res.data)
    initGame();
})
  }

  const moveSouth = () => {
    axios.post('http://127.0.0.1:8000/api/adv/move/', {'direction': "s"},
    {
  headers: {
    'Authorization': 'Token 0db5aff89cef50ae0ba713e045da1825c84159d5',
  }
  }).then(function (res) {
    console.log(res.data.title)
    setData(res.data)
    initGame();
})
  }

  const moveEast = () => {
    axios.post('http://127.0.0.1:8000/api/adv/move/', {'direction': "e"},
    {
  headers: {
    'Authorization': 'Token 0db5aff89cef50ae0ba713e045da1825c84159d5',
  }
  }).then(function (res) {
    console.log(res.data.title)
    setData(res.data)
    initGame();
})
  }

  const moveWest = () => {
    axios.post('http://127.0.0.1:8000/api/adv/move/', {'direction': "w"},
    {
  headers: {
    'Authorization': 'Token 0db5aff89cef50ae0ba713e045da1825c84159d5',
  }
  }).then(function (res) {
    console.log(res.data.title)
    setData(res.data)
    initGame();
})
  }

  let retData = "";
  let retImg = "";
  if (data.name) {
    retData = `Hello ${data?.name} You are in the ${data?.title}, ${data?.description}`;
    retImg = data.img_url;
  }
  return (
    <div className="App">
        <button onClick={initGame}>Init Game</button>
        <button onClick={moveNorth}>North</button>
        <button onClick={moveSouth}>South</button>
        <button onClick={moveEast}>East</button>
        <button onClick={moveWest}>West</button>
        <div className="game__info">
        <img src={retImg}/>
        <p>
                 {retData} 
        </p>

        </div>
    </div>
  );
}

export default App;
