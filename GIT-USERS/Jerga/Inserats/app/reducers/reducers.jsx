export var inseratsReducers = (state = [], action) => {
  switch (action.type) {
    case "ADD_INSERAT":
      return [...state, action.inserat];
    case "ADD_INSERATS":
      return [...state, ...action.inserats];
    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.auth;
    case "LOGOUT":
      return {
        ...state,
        uid: "",
      };
    default:
      return state;
  }
};
