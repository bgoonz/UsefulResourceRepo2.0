angular.module("NewsApp")
  .factory "NewsItem", [ "$resource", ($resource) ->
    $resource "/api/news/:id", null,
    { update: { method: "PUT" } }
  ]


