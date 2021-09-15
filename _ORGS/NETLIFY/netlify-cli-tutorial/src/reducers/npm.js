export function npm(state = {packages: {}}, action) {
  switch (action.type) {
    case 'NPM_INSTALL':
      return {
        packages: Object.assign({}, state.packages, action.payload)
      };
    default:
      return state;
  }
}
