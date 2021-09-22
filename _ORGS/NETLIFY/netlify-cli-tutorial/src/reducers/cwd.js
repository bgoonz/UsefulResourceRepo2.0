import { CWD_SET } from '../actions/base';

export function cwd(state = '', action) {
  switch (action.type) {
    case CWD_SET:
      return action.payload || '';
    default:
      return state;
  }
}
