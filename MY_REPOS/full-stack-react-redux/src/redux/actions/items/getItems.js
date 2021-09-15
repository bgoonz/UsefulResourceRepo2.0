import axios from 'axios'

import {
  GET_ITEMS_STARTED,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE
} from '../types'

export default (body) => {
  return async (dispatch) => {
    dispatch({ type: GET_ITEMS_STARTED })

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/items`)
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: response.data.data.items
      })
    } catch (error) {
      dispatch({
        type: GET_ITEMS_FAILURE,
        payload: error
      })
    }
  }
}
