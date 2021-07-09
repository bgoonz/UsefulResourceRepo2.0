import data from "./data";

export const SET_NAME = "SET_NAME";
export const SET_LOCATION = "SET_LOCATION";

export const setName = (name) => {
  return { type: SET_NAME, payload: name };
};

export const setLocation = (location) => {
  return { type: SET_LOCATION, payload: location };
};

export const initialState = {
  person: data,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        person: {
          ...state.person,
          name: action.payload,
        },
      };
    case SET_LOCATION:
      return {
        ...state,
        person: {
          ...state.person,
          location: action.payload,
        },
      };
    default:
      return state;
  }
};
