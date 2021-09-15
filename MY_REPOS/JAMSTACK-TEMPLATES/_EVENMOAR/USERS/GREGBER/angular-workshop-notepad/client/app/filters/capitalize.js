window.notepad.filters.filter('capitalize', function () {
  return function (input) {
    if (!input || typeof input !== 'string') return input;
    return input.substring(0,1).toUpperCase() + input.substring(1);
  };
});