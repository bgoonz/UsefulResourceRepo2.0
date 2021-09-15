import { addHistory } from './base';

export function helpSeen(msg) {
  return {
    type: 'HELP_SEEN',
    payload: msg
  };
}

export function showHelp() {
  return (dispatch, getState) => {
    const { npm, cwd, help } = getState();

    if (!npm.packages['netlify-cli']) {
      return helpMessage(dispatch, 'install');
    }

    if (!help.seen.npm) {
      dispatch(helpSeen('npm'));
      return helpMessage(dispatch, 'afterInstall');
    }

    switch (cwd) {
      case '/static-site':
        dispatch(helpSeen(cwd));
        return helpMessage(dispatch, 'staticSite');
      case '/jekyll-site':
        dispatch(helpSeen(cwd));
        return helpMessage(dispatch, 'jekyllSite');
      default:
        dispatch(helpSeen('netlify'));
        return helpMessage(dispatch, 'changeDir');
    }
  };
}

const messages = {
  install: [
    '',
    '__First step is to install netlify\'s command line tool__',
    '__Type **npm install netlify-cli -g** to install and get started__',
    ''
  ],
  afterInstall: [
    '',
    '__Great! Now you have the netlify command available__',
    '__Try typing **netlify** to learn more about what it does__',
    ''
  ],
  staticSite: [
    '',
    '__This directory contains a simple static site. Lets push it to netlify now__',
    '__Run **netlify deploy** and pick the default settings to push this site to our global CDN__',
    ''
  ],
  jekyllSite: [
    '',
    '__This is a simple jekyll site__',
    '__Lets try to run a build by doing **jekyll build**__',
    ''
  ],
  changeDir: [
    '',
    '__Try changing the current working directory to one of the demo sites__',
    '__(hint: use **ls** and **cd** to navigate)__',
    ''
  ]
};

function helpMessage(dispatch, message) {
  dispatch(addHistory(...messages[message]));
}
