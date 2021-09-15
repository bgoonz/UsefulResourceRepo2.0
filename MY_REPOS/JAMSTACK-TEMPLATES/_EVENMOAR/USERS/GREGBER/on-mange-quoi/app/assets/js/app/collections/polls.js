define([
  'app/models/poll'
],
function (
  Poll
) {
  return Backbone.Collection.extend({

    model: Poll,
    url: '/api/poll'
  });
});