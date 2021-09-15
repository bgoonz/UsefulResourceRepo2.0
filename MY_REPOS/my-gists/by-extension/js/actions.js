// Best practice dictates specifying constants
// for the different types of actions in an application
export const SEARCH_POST = 'SEARCH_POST';

// This is an action creator
export const searchPost = (query) => {
  // The returned object is an action
  return {
    // 'type' is a required field for an action, 
    // specifying the type of action being performed
    type: SEARCH_POST,
    query
  }
}