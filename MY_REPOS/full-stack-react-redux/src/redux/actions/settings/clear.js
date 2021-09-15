import { USER_SETTINGS_CLEAR } from '../types'

export default () => {
  return async (dispatch) => {
    dispatch({ type: USER_SETTINGS_CLEAR })
  }
}
