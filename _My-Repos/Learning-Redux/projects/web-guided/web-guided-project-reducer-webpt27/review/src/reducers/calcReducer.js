/*
  1. pure function
  2. two params: state, action

  action definition:
  1. plain object
  2. required 'type' key
  3. optional 'payload' key
*/

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, currentValue: state.currentValue + action.payload };
    case "SUBTRACT":
      return { ...state, currentValue: state.currentValue - action.payload };
    case "CLEAR":
      return { ...state, currentValue: 0 };
    case "ADD_TO_MEMORY":
      return { ...state, memory: state.currentValue };
    default:
      return state;
  }
};

export default reducer;
