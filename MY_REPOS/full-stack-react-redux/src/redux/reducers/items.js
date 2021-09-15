import {
  GET_ITEMS_STARTED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE,
  GET_ITEMS_RESET
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: null,
  data: null
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      }
    case GET_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case GET_ITEMS_RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default items
