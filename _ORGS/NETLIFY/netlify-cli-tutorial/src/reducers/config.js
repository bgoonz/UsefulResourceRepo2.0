export function config(state = {}, action) {
  switch (action.type) {
    case 'CONFIG_SET':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
