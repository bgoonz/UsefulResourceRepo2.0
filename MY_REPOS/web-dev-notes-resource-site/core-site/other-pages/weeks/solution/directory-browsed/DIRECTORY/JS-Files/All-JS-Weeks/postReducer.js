// import { posts } from '../data/posts';

// const initialState = posts;

const POST_ADD = 'posts/postAdd';
const POSTS_LOAD = 'posts/postsLoad';

export const postAdd = (post) => {
  return {
    type: POST_ADD,
    post
  };
};

export const postsLoad = (posts) => {
  return { type: POSTS_LOAD, posts };
};

// function postsFetch(){
//   return async (dispatch){

//   }
// }

export const postsFetch = () => async (dispatch) => {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await result.json();
  const minData = await data.slice(0, 5);
  dispatch(postsLoad(minData));
};

const postReducer = (state = [], action) => {
  switch (action.type) {
    case POST_ADD:
      return [{ ...action.post }, ...state];
    case POSTS_LOAD:
      return [...state, ...action.posts];
    default:
      return state;
  }
};

export default postReducer;
