define(["backbone"],
function(Backbone){
	var Model = Backbone.Model.extend({
		urlRoot: "user",
	});

	return Model;
});