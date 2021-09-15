const like = item => ({
  type: like.type,
  payload: item
});
like.type = 'user/like';

const initialState = {
  name: 'Anonymous',
  avatar: 'Anonymous',
  email: '',
  walletAddress: '',
  likes: {}
};

// Before immer
const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case like.type: {
      return {
        ...state,
        likes: {
          ...state.likes,
          [payload.id]: payload
        }
      };
    }
    default:
      return state;
  }
};