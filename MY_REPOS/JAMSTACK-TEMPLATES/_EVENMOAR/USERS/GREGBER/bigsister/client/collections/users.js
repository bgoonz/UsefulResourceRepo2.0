define(["backbone", "models/user"],
function(Backbone, User){
	var Collection = Backbone.Collection.extend({
		model: User,
		url: "/users"
	});

	return Collection;
});