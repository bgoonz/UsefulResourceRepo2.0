import axios from 'axios'
import { push } from 'connected-react-router'

import {
  UPDATE_USER_SETTINGS_STARTED,
  UPDATE_USER_SETTINGS_SUCCESS,
  UPDATE_USER_SETTINGS_FAILURE
} from '../types'

export default (user = {}) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER_SETTINGS_STARTED
    })
    const state = getState()
    const id = state.auth.data.decodedAccessToken.id
    const token = state.auth.data.accessToken

    const bodyFormData = new FormData()
    bodyFormData.append('avatar', user.avatar[0]) // File
    bodyFormData.append('name', user.name) // string
    bodyFormData.append('username', user.username) // string
    bodyFormData.append('bio', user.bio) // string
    // for (const pair of bodyFormData.entries()) console.info(`${pair[0]}: ${pair[1]}`)

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${id}/settings`,
        bodyFormData,
        {
          validateStatus: false,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
            // Remember to use multipart when requesting with a File
          }
        }
      )

      dispatch({
        type: UPDATE_USER_SETTINGS_SUCCESS,
        payload: response.data.data.user
      })
      // Redirect to new username, just in case
      dispatch(push(response.data.data.user.username))
    } catch (error) {
      dispatch({
        type: UPDATE_USER_SETTINGS_FAILURE,
        payload: error
      })
    }
  }
}
