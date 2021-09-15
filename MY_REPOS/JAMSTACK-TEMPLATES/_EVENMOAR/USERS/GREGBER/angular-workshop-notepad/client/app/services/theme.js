window.notepad.services.factory('theme', function () {
  return {
    name: 'black',
    set: function (name) {
      this.name = name;
    },
    get: function () {
      return this.name;
    }
  };
});