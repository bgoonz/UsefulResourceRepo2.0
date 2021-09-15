import { SET_DEV_PREVIEW } from '../types'

const initialState = {
  preview: '',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DEV_PREVIEW:
      return {
        ...state,
        preview: payload,
      }

    default:
      return state
  }
}
