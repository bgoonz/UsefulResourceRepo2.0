const bodyParser = require('body-parser')
const express = require('express')
const mustacheExpress = require('mustache-express')
const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const expressValidator = require('express-validator')

const app = express();

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let counterAttempts;
let attemptedLetters = [];
let message;
let result;
let loseMessage;

let word = words[Math.floor(Math.random()*words.length)];

const hideWord = (word) => word.split('').map(character => '_').join('');
let displayedWord = hideWord(word).split('');

app.get('/', (req,res) => {
  let displayedWord = hideWord(word);
  counterAttempts = 8;
  res.render('home', { word, displayedWord, counterAttempts});
})

app.post('/attempt', (req, res) => {
  const guessedLetter = req.body.letter.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    const displayedLetter = word[i];
    if (displayedLetter === guessedLetter) {
      displayedWord[i] = displayedLetter;
    }
  }

  if (attemptedLetters.includes(guessedLetter)) {
    message = "You have already guessed this letter!"
  }

  if (!word.includes(guessedLetter) && (!attemptedLetters.includes(guessedLetter))) {
    if (counterAttempts === 1){
      counterAttempts = 0;
      displayedWord = word.split('');
      loseMessage = "You lost!"
    }
    counterAttempts--
  }

  if ((displayedWord === word) && (counterAttempts >= 1)) {
    loseMessage = "You won!"
  }

  if (!attemptedLetters.includes(guessedLetter)){
    attemptedLetters.push(guessedLetter);
  }
  res.render('home', { displayedWord: displayedWord.join(''), counterAttempts, attemptedLetters, message, loseMessage, word});
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
