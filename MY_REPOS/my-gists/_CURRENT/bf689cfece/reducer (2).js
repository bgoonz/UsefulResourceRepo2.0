// Import necessary packages...
const posts = (state = {data: []}, action) => {
  let posts = {data: []};
  switch(action.type){
    case VIEW_ALL:
      // TODO: Return all posts
      return posts;
    case SEARCH_POST:
      // TODO: Return posts matched in search
      return posts;
    case UPDATE_POSTS:
      // Copy data from the action to the global state
      Object.assign(posts.data, action.posts.data);
      return posts;
    default:
      return state;
  }
}

export default posts;