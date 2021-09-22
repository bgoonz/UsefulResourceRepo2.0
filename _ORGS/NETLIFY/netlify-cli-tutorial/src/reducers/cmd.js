import { CMD_APPEND, CMD_SET } from '../actions/base';

export function cmd(state = '', action) {
  switch (action.type) {
    case CMD_APPEND:
      return state + action.payload;
    case CMD_SET:
      return action.payload || '';
    default:
      return state;
  }
}
