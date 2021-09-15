import { HIST_ADD, HIST_UPDATE, HIST_CLEAR } from '../actions/base';

function toArray(obj) {
  return Array.isArray(obj) ? obj : [obj];
}

export const startScreen = `__Type or click **help** to learn about netlify's CLI__
`;

export function history(state = startScreen.split('\n'), action) {

  switch (action.type) {
    case HIST_ADD:
      return state.concat(toArray(action.payload));
    case HIST_UPDATE:
      return state.slice(0, -1).concat([action.payload]);
    case HIST_CLEAR:
      return [];
    default:
      return state;
  }
}
