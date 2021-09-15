import { FETCH_TAGS_SUCCESS } from '../types'

const initialState = {
  items: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        items: payload.tags,
      }

    default:
      return state
  }
}
