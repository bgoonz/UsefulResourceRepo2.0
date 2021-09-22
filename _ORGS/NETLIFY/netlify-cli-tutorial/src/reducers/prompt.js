export function prompt(state = {text: '$ '}, action) {
  switch (action.type) {
    case 'PROMPT_SET':
      return Object.assign({}, action.payload);
    case 'PROMPT_CLEAR':
      return {};
    default:
      return state;
  }
}
