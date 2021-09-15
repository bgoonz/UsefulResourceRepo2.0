define(function () {
  return Backbone.View.extend({

    assign: function (selector, view) {
      view.setElement(this.$(selector)).render();
      return this;
    }

  });
});