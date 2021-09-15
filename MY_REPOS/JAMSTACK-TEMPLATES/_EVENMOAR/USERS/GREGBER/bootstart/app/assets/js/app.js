define([
  'js/app/view'
], function (
  View
) {
  window.app = (new View({
    el: 'body'
  })).render();
});