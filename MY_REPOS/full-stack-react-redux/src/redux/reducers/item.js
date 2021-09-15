import {
  GET_ITEM_STARTED,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAILURE,
  GET_ITEM_RESET
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: null,
  data: null
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      }
    case GET_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case GET_ITEM_RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default items
