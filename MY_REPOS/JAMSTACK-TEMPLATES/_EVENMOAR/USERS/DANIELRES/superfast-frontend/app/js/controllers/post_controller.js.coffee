angular
  .module("app")
  .controller "PostController", ($scope, PostResource, $routeParams) ->
    $scope.post = PostResource.get({ id: $routeParams.id })
