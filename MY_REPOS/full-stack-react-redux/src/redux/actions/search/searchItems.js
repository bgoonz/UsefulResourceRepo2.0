import axios from 'axios'

import {
  SEARCH_ITEMS_STARTED,
  SEARCH_ITEMS_SUCCESS,
  SEARCH_ITEMS_FAILURE
} from '../types'

export default (query) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_ITEMS_STARTED,
      payload: query
    })

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/search/items?keyword=${query.keyword}`
      )

      dispatch({
        type: SEARCH_ITEMS_SUCCESS,
        payload: response.data.data
      })
    } catch (error) {
      dispatch({
        type: SEARCH_ITEMS_FAILURE,
        payload: error
      })
    }
  }
}
