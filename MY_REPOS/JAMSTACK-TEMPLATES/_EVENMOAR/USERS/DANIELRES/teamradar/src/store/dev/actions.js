import { SET_DEV_PREVIEW } from 'store/types'

export const setDevPreview = payload => dispatch =>
  dispatch({ type: SET_DEV_PREVIEW, payload })
