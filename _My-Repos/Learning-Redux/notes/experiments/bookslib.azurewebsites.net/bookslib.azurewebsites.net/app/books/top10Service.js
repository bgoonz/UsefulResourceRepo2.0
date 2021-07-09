(function () {
  "use strict";

  angular.module("app").factory("top10Service", [
    "$resource",
    function ($resource) {
      return $resource("/api/books/top10");
    },
  ]);
})();
