import shallowequal from "shallowequal";
import _ from "lodash";

export const LIST_UPSERT = "@@list/LIST_UPSERT";
export const LIST_DELETE = "@@list/LIST_DELETE";

const ids = (state = [], { type, at, id }) => {
  switch (type) {
    case LIST_UPSERT: {
      const hasAt = typeof at !== "undefined";
      const includesItem = state.includes(id);

      if (includesItem && !hasAt) return state;

      if (hasAt) {
        state = state.slice();
        if (includesItem) _.pull(state, id);
        state.splice(at, 0, id);
        return state;
      } else {
        return [...state, id];
      }
    }

    case LIST_DELETE:
      if (!state.includes(id)) return state;
      return _.without(state, id);

    default:
      return state;
  }
};

function byIdReducerGenerator(itemReducer, initialState = {}) {
  return (state = {}, { type, id, innerAction }) => {
    switch (type) {
      case LIST_UPSERT: {
        const newItem = itemReducer(state[id], innerAction);

        if (state[id] && shallowequal(state[id], newItem)) return state;

        return {
          ...state,
          [id]: newItem,
        };
      }

      case LIST_DELETE: {
        if (!(id in state)) return state;
        return _.omit(state, id);
      }

      default:
        return state;
    }
  };
}

export default function indexedListReducerGenerator(
  itemReducer,
  initialState = { byId: {}, ids: [] }
) {
  const byId = byIdReducerGenerator(itemReducer, initialState.byId);

  return (state = initialState, action) => {
    switch (action.type) {
      case LIST_UPSERT:
      case LIST_DELETE: {
        const newById = byId(state.byId, action);
        if (newById === state.byId) return state;
        const newIds = ids(state.ids, action);

        return {
          ...state,
          ids: newIds,
          byId: newById,
        };
      }

      default:
        return state;
    }
  };
}
