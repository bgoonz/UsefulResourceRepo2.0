import { lookup } from '../lib/filesystem';
import { addHistory, setCwd } from '../actions/base';
import { showHelp, helpSeen } from './help';

export function cd(names) {
  return (dispatch, getState) => {
    const { files, cwd, help } = getState();
    if (names[0] === '..') {
      return dispatch(setCwd(cwd.split('/').slice(0, -1).join('/')));
    } else if (names[0] === '.') {
      return;
    }

    const dir = lookup(files, cwd, names[0]);
    if (typeof dir === 'object') {
      dispatch(setCwd(cwd.split('/').concat(names[0]).join('/')));
      if (!help[names[0]])  {
        dispatch(showHelp());
      }
    } else if (dir) {
      dispatch(addHistory(`-bash: cd: ${names[0]}: Not a directory`));
    } else {
      dispatch(addHistory(`-bash: cd: ${names[0]}: No such file or directory`));
    }
  };
}
