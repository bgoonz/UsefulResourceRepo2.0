import * as api from 'api'
import { FETCH_PERSON_SUCCESS, FETCH_PERSONS_SUCCESS } from 'store/types'

export const getPerson = id => dispatch =>
  api
    .get(`persons/${id}`)
    .then(payload => dispatch({ type: FETCH_PERSON_SUCCESS, payload }))

export const getPersons = () => dispatch =>
  api
    .get('persons')
    .then(payload => dispatch({ type: FETCH_PERSONS_SUCCESS, payload }))
