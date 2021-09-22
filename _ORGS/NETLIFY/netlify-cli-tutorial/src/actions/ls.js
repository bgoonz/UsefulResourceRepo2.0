import { lookup } from '../lib/filesystem';
import { addHistory } from './base';

export function ls(names) {
  return (dispatch, getState) => {
    const { files, cwd } = getState();
    const output = (line) => dispatch(addHistory(line));
    if (names.length) {
      for (var i = 0; i < names.length; i++) {
        const file = lookup(files, cwd, names[i]);
        console.log('found file: %o', file);
        if (typeof file === 'object') {
          output(Object.keys(file).join(' '));
        } else if (file) {
          output(names[i].split('/').pop());
        } else {
          output(`ls: ${names[i]}: No such file or directory`);
          return;
        }
      }
    } else {
      const dir = lookup(files, cwd);
      output(Object.keys(dir).join(' '));
    }
  };
}
