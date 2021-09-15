define(["lib/views/page", "text!templates/pages/contact.html"],
function(PageView, template) {
  "use strict";
  
  var View = PageView.extend({
    template: template
  });
  
  return View;
});