import { addHistory, clearCmd, setCmd, pushCmd, popCmd } from './base';
import { lookup } from '../lib/filesystem';
import { ls } from './ls';
import { cd } from './cd';
import { cat } from './cat';
import { clear } from './clear';
import { showHelp } from './help';
import { npm } from './npm';
import { netlify } from './netlify';
import { jekyll } from './jekyll';

const commands = {ls, cd, cat, help: showHelp, clear, npm, netlify, jekyll};

export function unkownCommand(cmd) {
  return addHistory(`-bash: ${cmd}: command not found`);
}

export function autocomplete() {
  return (dispatch, getState) => {
    const { files, cmd, cwd } = getState();
    const words = cmd.split(' ').filter((w) => w);
    switch (words.length) {
      case 0:
        break;
      case 1:
        const cmds = Object.keys(commands);
        for (let i = 0; i < cmds.length; i++) {
          if (words[0] === cmds[i].slice(0, words[0].length)) {
            return dispatch(setCmd(cmds[i]));
          }
        }
        break;
      default:
        const dir = lookup(files, cwd);
        const names = Object.keys(dir);
        const word = words[words.length - 1];
        for (let i = 0; i < names.length; i++) {
          if (word == names[i].slice(0, word.length)) {
            words[words.length - 1] = names[i];
            return dispatch(setCmd(words.join(' ')));
          }
        }
    }
  };
}

export function popHistory() {
  return (dispatch, getState) => {
    const { cmds } = getState();
    console.log('history: %s', cmds);
    const cmd = cmds.pop();
    dispatch(popCmd());
    dispatch(setCmd(cmd));
  };
}

let globalCallbackCalled = false;
const triggerGlobalCallback = window.terminalCallback ? function() {
  if (globalCallbackCalled) { return; }

  globalCallbackCalled = true;
  window.terminalCallback();
} : function() {};

const trackCmd = window.ga ? function(cmd) {
  window.ga('send', 'event', 'terminal', 'cmd', `CMD ${cmd}`);
} : function() {};

export function run() {
  return (dispatch, getState) => {
    const { cmd, prompt } = getState();

    triggerGlobalCallback();

    if (!prompt.options) {
      dispatch(addHistory(prompt.text + cmd));
    }
    dispatch(clearCmd());
    dispatch(pushCmd(cmd));
    if (cmd == '' && !prompt.handler) {
      return;
    }
    const words = cmd.split(' ').filter((w) => w);
    const fn = commands[prompt.handler || words[0]];
    if (fn) {
      trackCmd(prompt.handler ? prompt.handler : words[0]);
      dispatch(fn(prompt.handler ? words : words.slice(1)));
    } else {
      dispatch(unkownCommand(words[0]));
    }
  };
}
