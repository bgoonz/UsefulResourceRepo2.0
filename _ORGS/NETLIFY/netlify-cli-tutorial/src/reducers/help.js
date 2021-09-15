export function help(state = {seen: {}}, action) {
  switch (action.type) {
    case 'HELP_SEEN':
      state.seen = Object.assign({}, state.seen);
      state.seen[action.payload] = true;
      return state;
    default:
      return state;
  }
}
