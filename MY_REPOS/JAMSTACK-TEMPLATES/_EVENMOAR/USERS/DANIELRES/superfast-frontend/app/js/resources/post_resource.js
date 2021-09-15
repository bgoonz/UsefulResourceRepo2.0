angular.module("app").factory("PostResource", function($q, $resource) {
  return $resource('/api/v1/blog/posts/:id');
});
