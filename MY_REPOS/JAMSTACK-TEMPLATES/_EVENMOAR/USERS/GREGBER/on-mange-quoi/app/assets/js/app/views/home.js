define([
  'lib/views/template',
  'text!tpl/home.hbs',
  'app/router'
],
function (
  View,
  template,
  router
) {
  return View.extend({

    template: template,

    events: {
      'click .new': 'onClickButtonCreate'
    },

    onClickButtonCreate: function (event) {
      event.preventDefault();

      router.navigate($(event.currentTarget).attr('href'), {trigger: true});
    }
  });
});