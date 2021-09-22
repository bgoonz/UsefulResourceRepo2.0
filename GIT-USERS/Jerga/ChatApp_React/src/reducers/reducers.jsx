export var messageReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_MESSAGES":
      return {
        ...state,
      };
    case "FETCH_MESSAGES":
      return {
        ...action.messages,
      };
    case "ADD_MESSAGE": {
      console.log("STATE:  ", state);
      return {
        ...state,
        ...action.message,
      };
    }
    default:
      return state;
  }
};

export var channelReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CHANNELS":
      return {
        ...action.channels,
        selectedChannel: action.selectedChannel,
      };
    case "FETCH_CHANNEL":
      return {
        ...state,
        selectedChannel: action.selectedChannel,
      };
    default:
      return state;
  }
};
