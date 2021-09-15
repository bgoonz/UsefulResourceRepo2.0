define(["lib/views/template", "text!templates/elements/result-list.html", "collections/users", "models/user", "views/pages/user"],
function(TemplateView, template, UserCollection, UserModel, UserView) {
  "use strict";

  var View = TemplateView.extend({
    template: template		
  });
	
  return View;
});