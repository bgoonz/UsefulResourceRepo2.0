import axios from 'axios'

import {
  UPLOAD_IMAGE_STARTED,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE
} from '../types'

export default (body = {}) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE_STARTED })

    if (body.image && body.image[0]) {
      const bodyFormData = new FormData()
      bodyFormData.append('image', body.image[0]) // File

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/images/upload`,
          bodyFormData, // using FormData, not just plain body
          {
            validateStatus: false,
            headers: {
              'Content-Type': 'multipart/form-data'
              // Remember to use multipart when requesting with a File
            }
          }
        )

        dispatch({
          type: UPLOAD_IMAGE_SUCCESS,
          payload: response.data.data
        })
      } catch (error) {
        dispatch({
          type: UPLOAD_IMAGE_FAILURE,
          payload: error
        })
      }
    } else {
      dispatch({
        type: UPLOAD_IMAGE_FAILURE,
        payload: {}
      })
    }
  }
}
