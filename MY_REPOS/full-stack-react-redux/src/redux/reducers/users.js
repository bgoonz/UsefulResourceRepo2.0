import {
  GET_USERS_RESET,
  GET_USERS_STARTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: null,
  data: null
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_RESET:
      return {
        ...initialState
      }
    case GET_USERS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      }
    case GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export default items
