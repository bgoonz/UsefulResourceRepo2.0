import { FS_INIT, FS_ADD } from '../actions/base';

function setIn(obj, parts, value) {
  const newObj = {};
  if (parts.length === 1) {
    newObj[parts[0]] = value;
    return Object.assign({}, obj, newObj);
  }
  Object.keys(obj).forEach((key) => {
    if (key === parts[0]) {
      newObj[key] = setIn(obj[key], parts.slice(1), value);
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export function files(state = {}, action) {
  switch (action.type) {
    case FS_INIT:
      return Object.assign({}, action.payload);
    case FS_ADD:
      const parts = action.payload.path.split('/').filter((part) => part);
      return setIn(state, parts, action.payload.content);
    default:
      return state;
  }
}
