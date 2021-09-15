export const FS_INIT = 'FS_INIT';

export function initFilesystem(files) {
  return {
    type: FS_INIT,
    payload: files
  };
}

export const FS_ADD = 'FS_ADD';

export function addFile(path, content) {
  return {
    type: FS_ADD,
    payload: {path, content}
  };
}

export const HIST_ADD = 'HIST_ADD';

export function addHistory(/* arguments */) {
  return {
    type: HIST_ADD,
    payload: Array.prototype.slice.call(arguments)
  };
}

export const HIST_UPDATE = 'HIST_UPDATE';

export function updateHistory(str) {
  return {
    type: HIST_UPDATE,
    payload: str
  };
}

export const HIST_CLEAR = 'HIST_CLEAR';

export function clearHistory() {
  return {
    type: HIST_CLEAR
  };
}

export const CWD_SET = 'CWD_SET';

export function setCwd(cwd) {
  return {
    type: CWD_SET,
    payload: cwd
  };
}

export const CMD_APPEND = 'CMD_APPEND';
export const CMD_SET = 'CMD_SET';

export function appendCmd(char) {
  return {
    type: CMD_APPEND,
    payload: char
  };
}

export function setCmd(cmd) {
  return {
    type: CMD_SET,
    payload: cmd
  };
}

export function clearCmd() {
  return {
    type: CMD_SET,
    payload: ''
  };
}

export const CMDS_PUSH = 'CMDS_PUSH';
export const CMDS_POP = 'CMDS_POP';

export function pushCmd(cmd) {
  return {
    type: CMDS_PUSH,
    payload: cmd
  };
}

export function popCmd() {
  return {
    type: CMDS_POP
  };
}
