define([
  'lib/views/base',
  'app/router',
  'app/views/nav'
],
function (
  View,
  router,
  NavView
) {
  return View.extend({

    el: $('body'),

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.pageView = null;
      this.navView = new NavView();

      router.start();
      router.on('change:page', this.onPageChange, this);
    },

    onPageChange: function (pageView) {
      // stop listening last page
      if (this.pageView) {
        this.pageView.stopListening();
      }

      this.pageView = pageView;
      this.renderPage();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      this.assign('.navbar', this.navView);

      return this.renderPage();
    },

    renderPage: function () {
      if (this.pageView) {
        this.$el.attr('class', '');
        this.assign('#page', this.pageView);
      }

      return this;
    }
  });
});