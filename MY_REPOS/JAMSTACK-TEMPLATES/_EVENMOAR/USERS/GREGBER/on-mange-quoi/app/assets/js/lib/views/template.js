define([
  'lib/views/base'
],
function (
  View
) {
  return View.extend({

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.template = Handlebars.compile(this.template);
    },

    toJSON: function () {
      return {
        collection: this.collection ? this.collection.toJSON() : null,
        model: this.model ? this.model.toJSON() : null,
      };
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      this.$el.html(this.template(this.toJSON()));
      return this;
    }

  });
});