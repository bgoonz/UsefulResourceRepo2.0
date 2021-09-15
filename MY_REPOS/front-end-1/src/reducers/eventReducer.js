import {
  DELETE_INVITE, EDIT_INVITE, SET_INVITES, EDIT_EVENT, ADD_EVENT, SET_EVENTS, DELETE_EVENT
} from '../actions/eventActions';

const initialState = {
  invites: [],
  events: []
};

function eventReducer(state = initialState, action) {
  switch(action.type){
  case DELETE_INVITE:
    return {
      ...state,
      invites: state.invites.filter(invite => invite.id !== action.payload)
    };
  case EDIT_INVITE:
    const returnInvites = state.invites.map(invite => {
      if (invite.id === action.payload.id){
        return {
          ...invite,
          ...action.payload
        };
      } else {
        return invite;
      }
    });
    return {
      ...state,
      invites: returnInvites
    };
  case SET_INVITES:
    return {
      ...state,
      invites: action.payload
    };
  case EDIT_EVENT:
    const returnEvents = state.events.map(event => {
      if (event.id === action.payload.id){
        return {
          ...event,
          ...action.payload
        };
      } else {
        return event;
      }
    });
    return {
      ...state,
      events: returnEvents
    };
  case DELETE_EVENT:
    return ({
      ...state,
      events: state.events.filter(event => event.id !== action.payload)
    });
  case ADD_EVENT:
    return ({
      ...state,
      events: [...state.events, action.payload]
    });
  case SET_EVENTS:
    return ({
      ...state,
      events: action.payload
    });
  default:
    return state;
  }
}

export default eventReducer;
