const readline = require('readline');
const { MainScreen } = require('./main-screen');

const rl = readline.createInterface(process.stdin, process.stdout);

new MainScreen(rl)
  .show()
  .then(x => console.log(x), e => console.error(e));
