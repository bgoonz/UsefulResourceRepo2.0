define([
  'lib/views/template',
  'text!tpl/food-meeting/new-steps/signup.hbs'
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

    onSubmit: function (event) {
      event.preventDefault();

      this.model.addUser(this.$('#email').val());

      this.trigger('done');
    }
  });
});