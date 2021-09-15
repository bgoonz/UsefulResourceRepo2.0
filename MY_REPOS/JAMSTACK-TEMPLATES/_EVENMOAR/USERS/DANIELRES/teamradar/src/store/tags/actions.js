import * as api from 'api'
import { FETCH_TAGS_SUCCESS } from 'store/types'

export const getTags = () => dispatch =>
  api
    .get('tags')
    .then(payload => dispatch({ type: FETCH_TAGS_SUCCESS, payload }))
