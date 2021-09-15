import axios from 'axios'

import { GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILURE } from '../types'

export default (username) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_STARTED })

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${username}`
      )
      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data.data.user
      })
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error
      })
    }
  }
}
