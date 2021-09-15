angular.module("NewsApp").factory("NewsItemsLoader", function ($http) {
  var NewsItemsLoader = function () {
    this.filter = "all";
    this.items = [];
    this.after = 0;
    this.busy = false;
    this.ended = false;
  };

  NewsItemsLoader.prototype.setFilter = function (filter) {
    this.filter = filter;
    this.items = [];
    this.after = 0;
    this.ended = false;
    this.nextPage();
  };

  NewsItemsLoader.prototype.nextPage = function () {
    if (this.ended) return;
    if (this.busy) return;
    this.busy = true;

    var url = "/api/news/?after=" + this.after + "&filter=" + this.filter;
    $http.get(url).success(
      function (data) {
        var items = data;
        if (items.length == 0) this.ended = true;
        for (var i = 0; i < items.length; i++) {
          this.items.push(items[i]);
        }
        this.after = this.items.length;
        this.busy = false;
      }.bind(this)
    );
  };

  return NewsItemsLoader;
});
