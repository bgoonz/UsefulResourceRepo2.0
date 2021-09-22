const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { MainScreen } = require('./main-screen');
const { State } = require('./application');

const filePath = path.join(process.cwd(), 'tasks.json');
const rl = readline.createInterface(process.stdin, process.stdout);

fs.readFile(filePath, 'utf-8', (_, data) => {
  let state = new State(filePath);
  if (data) {
    state.loadFromJson(data);
  }
  new MainScreen(rl, state).show();
})
