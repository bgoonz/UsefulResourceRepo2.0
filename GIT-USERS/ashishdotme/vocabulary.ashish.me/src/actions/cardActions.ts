import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_CARDS, CARDS_LOADING } from './types';

export const getDeck = () => (dispatch: Dispatch) => {
  axios
    .get('https://api.ashish.me/words')
    .then((res) =>
      dispatch({
        type: GET_CARDS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_CARDS,
        payload: null,
      })
    );
};
