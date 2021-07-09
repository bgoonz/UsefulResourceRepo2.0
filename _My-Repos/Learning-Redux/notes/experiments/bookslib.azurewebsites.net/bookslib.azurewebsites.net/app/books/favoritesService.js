(function () {
  "use strict";

  angular.module("app").factory("favoritesService", [
    "$resource",
    function ($resource) {
      return $resource("/api/books/favorites");
    },
  ]);
})();
