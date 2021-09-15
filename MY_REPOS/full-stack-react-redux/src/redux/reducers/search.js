import {
  SEARCH_ITEMS_RESET,
  SEARCH_ITEMS_STARTED,
  SEARCH_ITEMS_SUCCESS,
  SEARCH_ITEMS_FAILURE
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: null,
  query: {},
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ITEMS_RESET:
      return initialState
    case SEARCH_ITEMS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
        query: action.payload
      }
    case SEARCH_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      }
    case SEARCH_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}
