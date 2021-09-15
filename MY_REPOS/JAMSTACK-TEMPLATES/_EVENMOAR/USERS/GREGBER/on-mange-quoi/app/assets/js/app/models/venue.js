define(function () {
  return Backbone.Model.extend({

    urlRoot: '/api/venue',

    parse: function (resp) {
      resp.id = resp.venue.id;
      return resp;
    }
  });
});