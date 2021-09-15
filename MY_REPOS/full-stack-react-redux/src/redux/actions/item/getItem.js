import axios from 'axios'

import { GET_ITEM_STARTED, GET_ITEM_SUCCESS, GET_ITEM_FAILURE } from '../types'

export default (slug) => {
  return async (dispatch) => {
    dispatch({ type: GET_ITEM_STARTED })

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/items/${slug}`
      )
      dispatch({
        type: GET_ITEM_SUCCESS,
        payload: response.data.data.item
      })
    } catch (error) {
      dispatch({
        type: GET_ITEM_FAILURE,
        payload: error
      })
    }
  }
}
