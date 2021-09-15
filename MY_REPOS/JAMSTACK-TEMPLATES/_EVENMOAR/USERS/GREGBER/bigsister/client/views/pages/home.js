define(["lib/views/page", "text!templates/pages/home.html", "views/pages/results", "router"],
function(PageView, template, ResultView, router) {
  "use strict";
  
  var View = PageView.extend({
    template: template,
    events: {
      "submit .search-form": "search",
      "click .search-form img": "search"
    },
    
    search: function() {
      router.navigate("results/" + this.$(".search-form input").val(), {trigger: true});
      return false;
    }
  });

  return View;
});