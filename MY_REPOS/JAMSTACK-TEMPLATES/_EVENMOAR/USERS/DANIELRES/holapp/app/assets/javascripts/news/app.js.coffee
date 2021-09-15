NewsApp = angular.module "NewsApp", [
  "ngResource",
  "ngSanitize",
  "btford.markdown",
  "infinite-scroll",
]

NewsApp.config ["$httpProvider",  ($httpProvider) ->
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
]
