import {
  AUTH_CLEAR,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_STARTED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_AUTHENTICATED_USER_STARTED,
  GET_AUTHENTICATED_USER_SUCCESS,
  GET_AUTHENTICATED_USER_FAILURE
} from '../actions/types'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  data: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CLEAR:
      return {
        ...initialState
      }
    case REGISTER_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      }
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case LOGIN_STARTED:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
        error: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          ...action.payload
        }
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      }
    case LOGOUT_STARTED:
      return {
        ...state,
        isLoading: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        isLoading: false
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    case GET_AUTHENTICATED_USER_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_AUTHENTICATED_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          user: action.payload
        }
      }
    case GET_AUTHENTICATED_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default auth
