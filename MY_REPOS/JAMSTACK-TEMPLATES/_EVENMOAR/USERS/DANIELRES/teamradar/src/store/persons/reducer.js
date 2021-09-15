import { FETCH_PERSON_SUCCESS, FETCH_PERSONS_SUCCESS } from '../types'

const initialState = {
  items: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PERSON_SUCCESS:
      const { id, ...rest } = payload.person
      return {
        ...state,
        items: { ...state.items, [id]: rest },
      }

    case FETCH_PERSONS_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          ...payload.persons.reduce(
            (acc, { id, ...rest }) => ({ ...acc, [id]: rest }),
            {}
          ),
        },
      }

    default:
      return state
  }
}
