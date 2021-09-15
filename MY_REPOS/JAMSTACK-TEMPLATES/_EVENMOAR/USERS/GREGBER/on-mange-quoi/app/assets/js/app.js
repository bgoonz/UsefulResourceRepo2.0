define([
  'app/views/app'
], function (
  AppView
) {
  window.app = (new AppView()).render();
});