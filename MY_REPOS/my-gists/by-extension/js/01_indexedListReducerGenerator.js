import shallowequal from 'shallowequal'
import _ from 'lodash'

export const LIST_UPSERT = '@@list/LIST_UPSERT'
export const LIST_DELETE = '@@list/LIST_DELETE'

const ids = (state=[], action) => {
  switch (action.type) {
    case LIST_UPSERT: {
      const hasAt = typeof action.at !== 'undefined'
      const includesItem = state.includes(action.id)

      if (includesItem && !hasAt) return state

      if (hasAt) {
        state = state.slice()
        if (includesItem) _.pull(state, action.id)
        state.splice(action.at, 0, action.id)
        return state
      }
      else {
        return [ ...state, action.id ]
      }
    }

    case LIST_DELETE:
      if (!state.includes(action.id)) return state
      return _.without(state, action.id)

    default:
      return state
  }
}

function byIdReducerGenerator(itemReducer, initialState={}) {
  return (state={}, action) => {
    switch (action.type) {
      case LIST_UPSERT: {
        const newItem = itemReducer(state[action.id], action.innerAction)

        if (state[action.id] && shallowequal(state[action.id], newItem)) return state

        return {
          ...state,
          [action.id]: newItem
        }
      }

      case LIST_DELETE: {
        if (!(action.id in state)) return state
        return _.omit(state, action.id)
      }

      default:
        return state
    }
  }
}

export default function indexedListReducerGenerator(itemReducer, initialState={ byId: {}, ids: [] }) {
  const byId = byIdReducerGenerator(itemReducer, initialState.byId)

  return function (state=initialState, action) {
    switch (action.type) {
      case LIST_UPSERT:
      case LIST_DELETE: {
        const newById = byId(state.byId, action)
        if (newById === state.byId) return state
        const newIds = ids(state.ids, action)

        return {
          ...state,
          ids: newIds,
          byId: newById
        }
      }

      default:
        return state
    }
  }
}
