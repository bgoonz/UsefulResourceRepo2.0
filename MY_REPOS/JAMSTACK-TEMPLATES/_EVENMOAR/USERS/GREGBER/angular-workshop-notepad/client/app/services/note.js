window.notepad.services.factory('Note', function ($resource) {
  return $resource('/api/notes/:id', {id: '@id'}, {
    query: {
      cache: true,
      isArray: true
    }
  });
});