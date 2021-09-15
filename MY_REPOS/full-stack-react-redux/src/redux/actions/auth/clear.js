import { AUTH_CLEAR } from '../types'

export default () => {
  return async (dispatch) => {
    dispatch({ type: AUTH_CLEAR })
  }
}
