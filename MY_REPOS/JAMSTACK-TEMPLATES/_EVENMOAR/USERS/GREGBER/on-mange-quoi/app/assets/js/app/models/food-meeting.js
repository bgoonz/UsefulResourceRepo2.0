define(function () {
  return Backbone.Model.extend({

    idAttribute: '_id',
    urlRoot: '/api/food-meeting',
    defaults: {
      hash: null,
      venues: [],
      users: []
    },

    addUser: function (email) {
      if (this.findUserByEmail(email)) {
        return this;
      }

      this.get('users').push({email: email});
      return this;
    },

    findUserByEmail: function (email) {
      return _.find(this.get('users'), function (user) {
        return user.email === email;
      });
    }
  });
});