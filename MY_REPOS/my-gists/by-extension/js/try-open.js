const cmds = { linux: 'xdg-open', win32: 'start', darwin: 'open' };
const open = cmds[process.platform];

const tryOpen = (dirname, editors = ['sublime', 'code', open]) => {
  try {
    cp.execSync([editors[0], dirname].join(' '));
    console.log('Opening in ' + editors[0]);
  } catch (err) {
    if (editors.length === 0) {
      throw new Error('Cannot find an editor to open');
    }
    return tryEditors(dirname, editors.slice(1));
  }
};

/**
 * Example usage
 */

const argv = require('minimist')(process.argv.slice(2));

// open the first resolved editor or file manager
if (argv.open === true) {
  tryOpen(path.dirname(__dirname));
  process.exit();
}

// open the specified application
if (typeof argv.open === 'string') {
  tryOpen(path.dirname(__dirname), [argv.open]);
  process.exit();
}