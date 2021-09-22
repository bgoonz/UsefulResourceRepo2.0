const posts = (state = {data: [], selected: []}, action) => {
  let posts = {data: [], selected: []};
  switch(action.type){
    case VIEW_ALL:
      Object.assign(posts.data, state.data);
      posts.selected = [];
      return posts;
    case SEARCH_POST:
      Object.assign(posts.data, state.data);
      let search = new JsSearch.Search('date-added');
      search.addIndex('title');
      search.addIndex('tags');
      search.addIndex('author');
      search.addDocuments(posts.data);
      posts.selected = search.search(action.query).map(searchResult => searchResult.id);
      return posts;
    case UPDATE_POSTS:
      Object.assign(posts.data, action.posts.data);
      return posts;
    default:
      return state;
  }
}