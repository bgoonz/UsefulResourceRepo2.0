import { SEARCH_ITEMS_RESET } from '../types'

export default () => (dispatch) => {
  dispatch({ type: SEARCH_ITEMS_RESET })
}
