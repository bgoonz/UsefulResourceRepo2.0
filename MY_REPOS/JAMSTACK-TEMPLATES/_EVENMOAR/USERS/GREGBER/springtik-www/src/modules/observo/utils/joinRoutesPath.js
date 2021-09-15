export default routes =>
  routes.reduce((complete, {path}) => {
    return path.startsWith('/')
      ? path
      : complete.endsWith('/')
        ? `${complete}${path}`
        : `${complete}/${path}`;
  }, '');
