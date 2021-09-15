// NOTE: this differs from original code of "angular-markdown-directive.js"
// in order to make in minification-safe

angular
  .module("btford.markdown", ["ngSanitize"])
  .provider("markdownConverter", function () {
    var opts = {};
    return {
      config: function (newOpts) {
        opts = newOpts;
      },
      $get: function () {
        return new Showdown.converter(opts);
      },
    };
  })
  .directive("btfMarkdown", function ($sanitize, markdownConverter) {
    return {
      restrict: "AE",
      link: function (scope, element, attrs) {
        if (attrs.btfMarkdown) {
          scope.$watch(attrs.btfMarkdown, function (newVal) {
            var html = newVal
              ? $sanitize(markdownConverter.makeHtml(newVal))
              : "";
            element.html(html);
          });
        } else {
          var html = $sanitize(markdownConverter.makeHtml(element.text()));
          element.html(html);
        }
      },
    };
  });
