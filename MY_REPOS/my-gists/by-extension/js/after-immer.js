import produce from 'immer';

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

// After immer
const reducer = produce((draft, { type, payload } = {}) => {
  switch (type) {
    case like.type: {
      draft.likes[payload.id] = payload;
      return;
    }
    default:
      return draft;
  }
}, initialState);
