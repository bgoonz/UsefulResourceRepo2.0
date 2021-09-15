angular
  .module("app")
  .controller "PostsController", ($scope, PostResource) ->
    $scope.posts = PostResource.query()





