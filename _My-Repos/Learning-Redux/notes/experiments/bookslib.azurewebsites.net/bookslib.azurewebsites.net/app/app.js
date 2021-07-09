(function () {
  "use strict";

  angular.module("app", ["ngResource", "ngRoute"]);

  angular.module("app").config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
      //$locationProvider.html5Mode( { enabled: true, requireBase: false});

      $routeProvider
        .when("/", {
          templateUrl: "/partials/home/index",
          controller: "HomeController",
        })
        .when("/books", {
          templateUrl: "/partials/books/index",
          controller: "BooksController",
          resolve: {
            books: function ($route, booksService) {
              return booksService.query().$promise;
            },
          },
        })
        .when("/books/favorites", {
          templateUrl: "/partials/books/index",
          controller: "FavoritesController",
        })
        .when("/books/top10", {
          templateUrl: "/partials/books/index",
          controller: "Top10Controller",
        })
        .when("/books/:id", {
          templateUrl: "/partials/books/book",
          controller: "BookController",
          resolve: {
            book: function ($route, bookService) {
              return bookService.get({ id: $route.current.params.id }).$promise;
            },
          },
        });
    },
  ]);

  angular.module("app").run([
    "$rootScope",
    "$location",
    "$http",
    function ($rootScope, $location, $http) {
      $rootScope.upVote = function (book) {
        $http.put("/api/books/upvote/" + book._id);
        book.votes += 1;
      };

      $rootScope.favorite = function (book) {
        $http.put("/api/books/favorite/" + book._id);
        book.isFavorite = !book.isFavorite;
      };

      $rootScope.isVoiceSupported = voiceCmdr.isSupported();

      if ($rootScope.isVoiceSupported) {
        // we need to tell Angular explicitly to refresh path, and observables in this case
        // http://stackoverflow.com/questions/20070077/angularjs-view-not-updating-on-model-change
        setInterval(function () {
          $rootScope.$apply(); // http://stackoverflow.com/questions/11784656/angularjs-location-not-changing-the-path
        }, 200);

        $rootScope.setSearchText = function (searchText) {
          var $searchText = $("#searchText");

          if ($searchText.is(":focus")) {
            $searchText.blur();
          }

          $rootScope.searchText = searchText;
        };

        // debug logs are useful during development (should be turned of in prod)
        voiceCmdr.debug(true);

        // add commands
        voiceCmdr.addCommand("home", function () {
          $location.path("/");
        });

        voiceCmdr.addCommand("books", function () {
          $location.path("/books");
          $rootScope.setSearchText("");
        });

        voiceCmdr.addCommand("favorites", function () {
          $location.path("/books/favorites");
        });

        voiceCmdr.addCommand("top 10", function () {
          $location.path("/books/top10");
        });

        voiceCmdr.addCommand("search", function (searchText) {
          $location.path("/books");
          $rootScope.setSearchText(searchText);
        });

        voiceCmdr.addCommand("favorite", function () {
          $("a#favorite").click();
        });

        // hook up the view
        $rootScope.recStatusImg = function () {
          return voiceCmdr.isRecognizing()
            ? "sound-graph-listening.gif"
            : "sound-graph-static.jpg";
        };

        $rootScope.listening = function (start) {
          if (start) {
            voiceCmdr.start();
          } else {
            voiceCmdr.stop();
          }
        };

        $rootScope.getCommand = function () {
          voiceCmdr.getCommand();
        };
      }
    },
  ]);
})();
