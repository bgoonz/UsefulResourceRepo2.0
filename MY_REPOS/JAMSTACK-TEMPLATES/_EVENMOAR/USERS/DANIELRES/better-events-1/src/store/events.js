export const types = {
  EVENT_REQUEST: "EVENT_REQUEST",
  EVENT_SUCCESS: "EVENT_SUCCESS",
  EVENT_FAILURE: "EVENT_FAILURE",
};

export const initialState = { entries: {} };

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EVENT_SUCCESS:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.eventCode]: action.event,
        },
      };

    case types.EVENT_FAILURE:
      console.error({
        error: action.error,
        eventCode: action.eventCode,
      });

    default:
      return state;
  }
};
