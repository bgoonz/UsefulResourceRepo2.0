import {
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: null,
  data: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      }
    case GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}

export default user
