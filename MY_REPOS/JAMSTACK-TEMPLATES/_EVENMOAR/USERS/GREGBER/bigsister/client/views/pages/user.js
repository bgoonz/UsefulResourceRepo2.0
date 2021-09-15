define(["lib/views/page", "text!templates/pages/user.html", "models/user", "router"],
function(PageView, template, UserModel, router) {
  "use strict";
  
  var View = PageView.extend({
    template: template,
    
    initialize: function() {
      PageView.prototype.initialize.call(this);
			this.user = new UserModel();
			this.user.on("change", this.render, this);
    },

		render: function (){
			PageView.prototype.render.call(this);
			console.log(this.options.urlParams);
      this.user.fetch({data: {user: this.urlParams[0]}});
			console.log(this.user);
		}

  });

  return View;
});