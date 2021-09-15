define([
  'lib/views/base',
  'app/router'
],
function (
  View,
  router
) {
  return View.extend({

    events: {
      'click li a': 'onClickRoute',
      'click .brand': 'onClickBrand'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.route = null;

      router.on('route', this.setRoute, this);
      this.on('change:route', this.render, this);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      this.$('.nav li')
      .removeClass('active')
      .filter('[data-route="' + this.route + '"]')
      .addClass('active');
    },

    setRoute: function (route) {
      this.route = route;
      this.trigger('change:route', route);
    },

    onClickBrand: function (event) {
      event.preventDefault();

      router.navigate('', {trigger: true});
    },

    onClickRoute: function (event) {
      event.preventDefault();

      router.navigate($(event.currentTarget).attr('href'), {trigger: true});
    }
  });
});