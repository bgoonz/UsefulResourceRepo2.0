import {
  USER_SETTINGS_CLEAR,
  GET_USER_SETTINGS_STARTED,
  GET_USER_SETTINGS_SUCCESS,
  GET_USER_SETTINGS_FAILURE,
  UPDATE_USER_SETTINGS_STARTED,
  UPDATE_USER_SETTINGS_SUCCESS,
  UPDATE_USER_SETTINGS_FAILURE
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: null,
  data: {}
}

const settings = (state = initialState, action) => {
  switch (action.type) {
    case USER_SETTINGS_CLEAR:
      return {
        ...initialState
      }
    case GET_USER_SETTINGS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      }
    case GET_USER_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case UPDATE_USER_SETTINGS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case UPDATE_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      }
    case UPDATE_USER_SETTINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default settings
