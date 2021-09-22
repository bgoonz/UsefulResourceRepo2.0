import { GET_CARDS, CARDS_LOADING } from '../actions/types';

const intialState = {
  cards: null,
  loading: false,
};

export default function (state = intialState, action: any) {
  switch (action.type) {
    case CARDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
