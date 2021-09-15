import "whatwg-fetch";

import { types as eventTypes } from "./events";

const fetchEvent = (eventCode, dispatch) =>
  fetch(`/api/v1/events/${eventCode}`)
    .then((response) => response.json())
    .then(({ event }) =>
      dispatch({
        type: eventTypes.EVENT_SUCCESS,
        event,
        eventCode,
      })
    )
    .catch((error) =>
      dispatch({
        type: eventTypes.EVENT_FAILURE,
        error,
        eventCode,
      })
    );

export default {
  ADMINPAGE: "/admin",
  HOMEPAGE: "/",
  EVENTPAGE: {
    path: "/:eventCode",
    thunk: (dispatch, getState) => {
      const { eventCode } = getState().location.payload;

      fetchEvent(eventCode, dispatch);
    },
  },
  EVENTSUBJECTPAGE: {
    path: "/:eventCode/:subjectId",
    thunk: (dispatch, getState) => {
      const { eventCode } = getState().location.payload;

      fetchEvent(eventCode, dispatch);
    },
  },
};
