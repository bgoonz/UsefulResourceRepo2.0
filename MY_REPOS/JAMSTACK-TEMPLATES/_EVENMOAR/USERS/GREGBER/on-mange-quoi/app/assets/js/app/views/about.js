define([
  'lib/views/template',
  'text!tpl/about.hbs'
],
function (
  View,
  template
) {
  return View.extend({

    template: template
  });
});