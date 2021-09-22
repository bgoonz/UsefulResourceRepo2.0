import { lookup } from '../lib/filesystem';

export function getNetlifyCmd(state) {
  return state.npm.packages && state.npm.packages['netlify-cli'];
}

export function getHelpSeen(state) {
  return state.help.seen;
}

export function getPlayback(state) {
  return state.config && state.config.playback;
}

export function getFirstDeploySeen(state) {
  return state.help.seen && state.help.seen.firstDeploy;
}

export function getFiles(state) {
  return state.files;
}

export function getCwd(state) {
  return state.cwd;
}

export function getConf(state) {
  const cwd = getCwd(state);
  const file = lookup(state.files, cwd, '.netlify');
  return file ? JSON.parse(file) : null;
}
