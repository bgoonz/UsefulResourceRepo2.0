import { addHistory, updateHistory } from './base';
import { showHelp } from './help';
import { hidePrompt, clearPrompt } from './prompt';

export function install(pkg) {
  var payload = {};
  payload[pkg] = true;
  return {
    type: 'NPM_INSTALL',
    payload: payload
  };
}

const spinner = [
  '/',
  '-',
  '\\',
  '|'
];

function installNetlify(dispatch) {
  const spin = (i) => {
    dispatch(updateHistory(spinner[i % spinner.length]));
    if (i < 10) {
      setTimeout((() => spin(i + 1)), 100);
    } else {
      dispatch(updateHistory(''));
      dispatch(install('netlify-cli'));
      dispatch(addHistory(
        '/usr/local/bin/netlify -> /usr/local/lib/node_modules/netlify-cli/bin/cli.js',
        '├── left-pad@0.0.3',
        '├── isarray@1.0.0',
        '├── is-positive-integer@1.1.1',
        '├── babel@6.5.2'
      ));
      dispatch(showHelp());
      dispatch(clearPrompt());
    }
  };
  dispatch(addHistory(spinner[0]));
  dispatch(hidePrompt());
  spin(1);
}

export function npm(names) {
  return (dispatch, getState) => {
    if (names.length) {
      switch (names[0]) {
        case 'install':
        case 'i':
          if (names[1] === 'netlify-cli' && names[2] === '-g') {
            return installNetlify(dispatch);
          }
          if (names[1] === 'netlify-cli' && names[2] !== '-g') {
            return dispatch(addHistory(
              'Make sure you add -g when installing netlify-cli',
              'Without -g you won\'t actually add netlify as a global command'
            ));
          }
          if (names[1] === 'netlify') {
            return dispatch(addHistory(
              'The \'netlify\' package in npm is our node library that you can',
              'use to do deploys from within your own scripts or apps.',
              'To start this tutorial you\'ll need \'netlify-cli\''
            ));
          }
          if (names.length === 1) {
            return dispatch(addHistory(
              `ENOENT, open '/Users/mbc/package.json'`,
              `package.json This is most likely not a problem with npm itself.`,
              `package.json npm can't find a package.json file in your current directory.`
            ));
          }
          return dispatch(addHistory(
            'Don\'t worry about this package right now.',
            'You won\'t need it for this tutorial.'
          ));
        default:
          dispatch(addHistory(
            'You really didn\'t expect us to implement all of npm in the browser, right?',
            'How about typing **npm install netlify-cli -g**?'
          ));
      }
    } else {
      dispatch(addHistory(
'Usage: npm <command>',
'',
'where <command> is one of:',
'    access, add-user, adduser, apihelp, author, bin, bugs, c,',
'    cache, completion, config, ddp, dedupe, deprecate, dist-tag,',
'    dist-tags, docs, edit, explore, faq, find, find-dupes, get,',
'    help, help-search, home, i, info, init, install, issues, la,',
'    link, list, ll, ln, login, ls, outdated, owner, pack,',
'    prefix, prune, publish, r, rb, rebuild, remove, repo,',
'    restart, rm, root, run-script, s, se, search, set, show,',
'    shrinkwrap, star, stars, start, stop, t, tag, test, tst, un,',
'    uninstall, unlink, unpublish, unstar, up, update, v,',
'    verison, version, view, whoami',
'',
'npm <cmd> -h     quick help on <cmd>',
'npm -l           display full usage info',
'npm faq          commonly asked questions',
'npm help <term>  search for help on <term>',
'npm help npm     involved overview',
'',
'or on the command line via: npm <command> --key value',
'Config info can be viewed via: npm help config'));
    }
  };
}
