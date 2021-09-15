import { lookup } from '../lib/filesystem';
import { addHistory } from './base';

export function cat(names) {
  return function(dispatch, getState) {
    const { files, cwd } = getState();
    for (var i = 0; i < names.length; i++) {
      const name = names[i];
      const file = lookup(files, cwd, name);
      if (typeof file === 'string') {
        return dispatch(addHistory(file));
      } else if (file) {
        return dispatch(addHistory(`cat: ${name}: Is a directory`));
      } else {
        dispatch(addHistory(`cat: ${name}: No such file or directory`));
      }
    }
  };
}
