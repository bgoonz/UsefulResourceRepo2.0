import { goBack } from 'connected-react-router'

import { NAVIGATE_BACK } from '../types'

const navigateBack = () => {
  return async (dispatch) => {
    dispatch({ type: NAVIGATE_BACK })

    dispatch(goBack())
  }
}

export default navigateBack
