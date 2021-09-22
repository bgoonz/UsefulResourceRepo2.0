import { CMDS_PUSH, CMDS_POP } from '../actions/base';

export function cmds(state = [], action) {
  switch (action.type) {
    case CMDS_PUSH:
      return state.concat([action.payload]);
    case CMDS_POP:
      return state.slice(0, -1);
    default:
      return state;
  }
}
