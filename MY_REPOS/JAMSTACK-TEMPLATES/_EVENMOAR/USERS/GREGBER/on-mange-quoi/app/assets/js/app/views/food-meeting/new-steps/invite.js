define([
  'lib/views/template',
  'text!tpl/food-meeting/new-steps/invite.hbs'
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

      var emails = _(this.$('#emails').val().split(/\s*[,;\s]\s*/)).filter(function (value) {
        return value.match(/@/);
      });

      _.each(emails, _.bind(this.model.addUser, this.model));

      this.trigger('done');
    }
  });
});