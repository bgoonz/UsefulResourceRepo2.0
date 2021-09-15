define(function () {
  var Router = Backbone.Router.extend( {

    routes: {
      ''                                  : 'home',
      'about'                             : 'about',
      'food-meeting/new'                  : 'newFoodMeeting',
      'food-meeting/:id'                  : 'registerFoodMeeting',
      'food-meeting/:id/poll/:email-:hash': 'foodMeetingPoll'
    },

    initialize: function () {
      this.page = null;
    },

    requireRoute: function (route, params) {
      require(['app/routes/' + route], _.bind(function (pageFactory) {
        this.onRequireRoute(pageFactory, params);
      }, this));
    },

    onRequireRoute: function (pageFactory, params) {
      this.page = pageFactory.apply(this, params);
      this.trigger('change:page', this.page);
    },

    home: function () {
      this.requireRoute('home', arguments);
    },

    newFoodMeeting: function () {
      this.requireRoute('food-meeting/new', arguments);
    },

    registerFoodMeeting: function () {
      this.requireRoute('food-meeting/register', arguments);
    },

    foodMeetingPoll: function () {
      this.requireRoute('food-meeting/poll', arguments);
    },

    about: function () {
      this.requireRoute('about', arguments);
    },

    start: function () {
      Backbone.history.start({pushState: true});
    }
  });

  return new Router();
});