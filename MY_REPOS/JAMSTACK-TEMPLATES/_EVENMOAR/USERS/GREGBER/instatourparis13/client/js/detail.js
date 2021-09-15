(function () {
  /* globals Mousetrap, Hammer */

  angular.module('itp13.detail', ['itp13.resources'])
    .controller('DetailCtrl', ['$scope', '$stateParams', '$state', 'Media', DetailCtrl]);

  function DetailCtrl($scope, $stateParams, $state, Media) {
    $scope.media = Media.get({ id: $stateParams.id });
    $scope.prev = Media.prev({ id: $stateParams.id });
    $scope.next = Media.next({ id: $stateParams.id });
    $scope.rank = Media.rank({ id: $stateParams.id });

    $scope.$watch('rank.rank', function (rank) {
      $scope.page = rank ? Math.floor(rank / 8) + 1 : 1;
    });

    function goPrev() {
      if ($scope.prev.id) $state.go('photos.detail', { id: $scope.prev.id });
    }

    function goNext() {
      if ($scope.next.id) $state.go('photos.detail', { id: $scope.next.id });
    }

    Hammer(document.getElementsByClassName('detail')[0])
      .on('swiperight', goPrev)
      .on('swipeleft', goNext);

    Mousetrap.bind('right', goNext);
    Mousetrap.bind('left', goPrev);
  }

})();