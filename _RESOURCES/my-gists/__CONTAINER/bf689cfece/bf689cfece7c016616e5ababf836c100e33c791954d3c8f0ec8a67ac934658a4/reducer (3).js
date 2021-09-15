const posts = (state = [], action) => {
  let posts = [];
  switch(action.type){
    case VIEW_ALL:
      // TODO: Return all posts
      return posts;
    case SEARCH_POST:
      // TODO: Return posts matched in search
      return posts;
    default:
      return state;
  }
}