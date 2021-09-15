import axios from 'axios'
import { push } from 'connected-react-router'
import ReactGA from 'react-ga'

import { REGISTER_STARTED, REGISTER_SUCCESS, REGISTER_FAILURE } from '../types'

export default (body = {}) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_STARTED })

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        body
      )

      dispatch({ type: REGISTER_SUCCESS, payload: response.data.data })

      ReactGA.event({ category: 'User', action: 'Register new account' })

      dispatch(push('/login'))
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload:
          'Sorry, registration is failed. Please check your information again.'
      })
    }
  }
}
