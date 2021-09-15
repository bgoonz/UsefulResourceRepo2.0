import { RELOAD_MAP, RELOAD_MAP_FINISH } from "../actions/mapActions";

const INITIAL_STATE = {
  isReloading: false,
};

export const rentalMapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RELOAD_MAP:
      return { ...state, isReloading: true };
    case RELOAD_MAP_FINISH:
      return { ...state, isReloading: false };
    default:
      return state;
  }
};
