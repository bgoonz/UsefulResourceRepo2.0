import { FETCH_USERS } from "../actions/usersActions";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;

    default:
      return state;
  }
};
