export const SET_TITLE = "SET_TITLE";
export const TOGGLE_EDITING = "TOGGLE_EDITING";

export const titleReducer = (state, action) => {
  // if (action.type === 'SET_TITLE') {
  //   return {
  //     ...state,
  //     title: action.payload,
  //     editing: false
  //   }
  // } else if (action.type === 'TOGGLE_EDITING') {
  //   return {
  //     ...state,
  //     editing: !state.editing
  //   }
  // }
  // return state;
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload,
        editing: false,
      };
    case TOGGLE_EDITING:
      return {
        ...state,
        editing: !state.editing,
      };
    default:
      return state;
  }
};
