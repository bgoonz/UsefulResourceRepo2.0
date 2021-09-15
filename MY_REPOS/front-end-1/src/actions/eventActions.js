export const ADD_EVENT = 'ADD_EVENT';
export const SET_EVENTS = 'SET_EVENTS';
export const DELETE_EVENT = 'DELETE_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';
export const SET_INVITES = 'SET_INVITES';
export const DELETE_INVITE = 'DELETE_INVITE';
export const EDIT_INVITE = 'EDIT_INVITE';


const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    payload: events
  };
};

const setInvites = (invites) => {
  return {
    type: SET_INVITES,
    payload: invites
  }
};

const editInvite = (invite) => {
  return {
    type: EDIT_INVITE,
    payload: invite
  };
};

const deleteInvite = (id) => {
  return {
    type: DELETE_INVITE,
    payload: id
  };
};

const addEvent = (event) => {
  return {
    type: ADD_EVENT,
    payload: event
  };
};

const deleteEvent = (id) => {
  return {
    type: DELETE_EVENT,
    payload: id
  };
};

const editEvent = (event) => {
    return {
      type: EDIT_EVENT,
      payload: event
    };
};

export { deleteInvite, editInvite, setInvites, setEvents, addEvent, deleteEvent, editEvent };
