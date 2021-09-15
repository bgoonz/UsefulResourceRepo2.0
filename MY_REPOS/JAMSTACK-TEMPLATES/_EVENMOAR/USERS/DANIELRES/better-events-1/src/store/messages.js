export const types = {
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
};

export const initialState = [];

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_MESSAGE:
      console.log({ action });
      return [...state, action.message];

    default:
      return state;
  }
};
