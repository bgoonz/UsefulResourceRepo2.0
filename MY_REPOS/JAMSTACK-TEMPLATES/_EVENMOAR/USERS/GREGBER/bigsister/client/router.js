define(["backbone"],
function(Backbone){
  "use strict";

  var Router = Backbone.Router.extend({
    
    routes : {
      "": {
        name: "home",
        view: "home"
      },
      "about": {
        name: "about",
        view: "about"
      },
      "contact": {
        name: "contact",
        view: "contact"
      },
      "results/:query": {
        name: "results",
        view: "results"
      },
      "user/:name": {
        name: "user",
        view: "user"
      }
    },

    initialize: function() {

      this.views = [];

      var self = this,
      route,
      routeConfig;

      for(route in this.routes) {
        routeConfig = this.routes[route];
        (
          function(routeConfig) {
            self.route(route, routeConfig.name, function() {
              self.routeHandler(routeConfig, arguments);
            });
          }
          (routeConfig)
        );
      }
    },

    routeHandler: function(route, params) {
      var self = this;
			
      require(["views/pages/" + route.view], function(View) {
        if(typeof self.views[route.view] === "undefined") {
          self.views[route.view] = new View();
        }
        
				self.views[route.view].urlParams = params;
				
				if(typeof self.views[route.view].load !== "undefined") {
				  typeof self.views[route.view].load();
				}
				
        self.views[route.view].render();
      });
    },
    
    start: function() {
      Backbone.history.start();
    }
  });

  return new Router();
});