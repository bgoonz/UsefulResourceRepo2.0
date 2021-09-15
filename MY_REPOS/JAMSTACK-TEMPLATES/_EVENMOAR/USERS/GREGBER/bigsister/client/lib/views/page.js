define(["jquery", "lib/views/template"],
function($, TemplateView) {
  "use strict";

  var PageView = TemplateView.extend({
    el: $("#container")
  });

  return PageView;
});