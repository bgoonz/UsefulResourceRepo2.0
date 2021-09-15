define([
  'lib/views/template',
  'text!tpl/food-meeting/new-steps/complete.hbs'
],
function (
  View,
  template
) {
  return View.extend({

    template: template,

    toJSON: function () {
      var data = View.prototype.toJSON.apply(this, arguments);

      data.link = window.location.protocol + '//' + window.conf.domain + '/food-meeting/' + this.model.id;

      return data;
    }
  });
});