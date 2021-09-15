define([
  'lib/views/template',
  'text!tpl/food-meeting/register.hbs'
],
function (
  View,
  template
) {
  return View.extend({

    template: template,

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.saved = false;

      this.model.on('change', this.render, this);
      this.model.fetch();
    },

    onSubmit: function (event) {
      event.preventDefault();

      this.model
      .addUser(this.$('#email').val())
      .save(null, {
        success: _.bind(this.onSaved, this)
      });
    },

    onSaved: function () {
      this.saved = true;
      this.render();
    },

    toJSON: function () {
      var data = View.prototype.toJSON.apply(this, arguments);

      data.saved = this.saved;

      return data;
    }
  });
});