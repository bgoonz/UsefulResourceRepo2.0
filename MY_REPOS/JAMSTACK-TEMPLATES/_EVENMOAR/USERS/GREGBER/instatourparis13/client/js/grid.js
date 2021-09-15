(function () {

  angular.module('itp13.grid', ['itp13.resources'])
    .controller('GridCtrl', ['$scope', '$stateParams', 'Media', GridCtrl]);

  function GridCtrl($scope, $stateParams, Media) {
    $scope.limit = 8;
    $scope.count = Media.count();
    $scope.page = parseInt($stateParams.p, 10) || 1;
    $scope.medias = Media.query({
      skip: ($scope.page - 1) * $scope.limit,
      limit: $scope.limit
    });
  }

})();