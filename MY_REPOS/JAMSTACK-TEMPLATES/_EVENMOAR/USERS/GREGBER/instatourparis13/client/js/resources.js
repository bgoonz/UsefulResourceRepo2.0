(function () {

  angular.module('itp13.resources', ['ngResource'])
    .factory('Media', ['$resource', Media]);

  function Media($resource) {
    return $resource('/api/medias/:id', {id:'@id'}, {
      prev: {
        method: 'GET',
        url: '/api/medias/:id/prev'
      },
      next: {
        method: 'GET',
        url: '/api/medias/:id/next'
      },
      rank: {
        method: 'GET',
        url: '/api/medias/:id/rank'
      },
      count: {
        method: 'GET',
        url: '/api/medias/count',
        cache: true
      }
    });
  }

})();