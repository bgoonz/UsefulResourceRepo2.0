var uuid = require("node-uuid");
var moment = require("moment");

export var searchTextReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return action.searchText;
    default:
      return state;
  }
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_SHOW_COMPLETED":
      return !state;
    default:
      return state;
  }
};

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.todo];
    case "UPDATE_TODO":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            ...action.updates,
          };
        } else {
          return todo;
        }
      });
    case "ADD_TODOS":
      return [...state, ...action.todos];
    case "CLEAN_TODOS":
      return [];
    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  console.log("reducer: ", action);
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
