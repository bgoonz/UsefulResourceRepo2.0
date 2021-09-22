import types from "../actions/types";

export const heroReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_HEROES:
      return action.heroes;
    case types.CREATE_HERO:
      return [...state, action.heroes];
    case types.CREATE_HERO_MULTIPLE:
      var arr = [...state];
      arr.push(action.heroes["0"]);
      arr.push(action.heroes["1"]);
      return [...arr];
    default:
      return state;
  }
};
