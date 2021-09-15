define(["lib/views/page", "text!templates/pages/results.html", "views/elements/result-list", "collections/users", "models/user", "jquery"],
function(PageView, template, ResultListView, UserCollection, UserModel, $) {
  "use strict";
  
  var View = PageView.extend({
    template: template,
    
    initialize: function() {
      PageView.prototype.initialize.call(this);
      
      this.users = new UserCollection();
      this.users.on("reset", this.computeScore, this);
      this.users.on("reset", this.render, this);
      this.resultListView = new ResultListView({users: this.users});
    },
    
    render: function() {
      PageView.prototype.render.call(this);
      this.assign(this.resultListView, ".result-list");
    },
    
    computeScore: function() {
      var scores = [];
			for(var m in this.users.models){
				var child = this.users.models[m];
				scores.push(child.attributes.userScore);
			}
			var minScore = scores.sort(function(a,b){return a-b;})[0];
			var maxScore = scores.reverse()[0];
			for(var m in this.users.models){
				var oldScore    = this.users.models[m].attributes.userScore;
				var newScore = 4-(4-1)*(oldScore-minScore)/(maxScore-minScore);
				this.users.models[m].set({ userScore: Math.floor(newScore) });
			}
    },
    
    load: function() {
      if(typeof this.search === "undefined" || this.search !== this.urlParams[0]) {
        this.search = this.urlParams[0];
        $("[name=search]").val(this.search);
        this.users.reset();
        this.users.fetch({data: {search: this.urlParams[0]}});
      }
    }
  });

  return View;
});