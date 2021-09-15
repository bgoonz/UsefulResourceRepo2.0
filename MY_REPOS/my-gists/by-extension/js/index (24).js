#!/usr/bin/env node

const { exec } = require('child_process');

exec('code --list-extensions', (err, stdout) => {
  if (err) console.log('Error occurred', err);

  const extensions = stdout.split('\n').filter(extension => extension);

  console.log(`\n✅  Installed VS Code Extensions: ${extensions.length} \n`);

  console.log(
    extensions.map((extension, index) => `${index + 1}. https://marketplace.visualstudio.com/items?itemName=${extension}`).join('\n'),
    '\n'
  );
});
