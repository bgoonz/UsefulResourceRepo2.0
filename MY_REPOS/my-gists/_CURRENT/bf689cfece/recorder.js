'use strict';

const fs = require('fs');
const path = require('path');

module.exports = name => {
  const datapath = path.join(__dirname, `${name}.json`);
  const history = [];

  const record = (input, key) => {
    history.push({ input, key });
  };

  const save = () => {
    fs.writeFileSync(datapath, JSON.stringify(history, null, 2));
  };

  return { record, save };
};
