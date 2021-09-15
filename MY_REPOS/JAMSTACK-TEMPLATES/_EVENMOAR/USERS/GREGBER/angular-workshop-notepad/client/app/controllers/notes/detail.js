window.notepad.controllers.controller('NotesDetailCtrl', function ($stateParams, $scope, $state, Note, theme) {
  $scope.note = Note.get({id: $stateParams.id});
  $scope.delete = function () {
    $scope.note.$delete().then(function () {
      $scope.$emit('noteDeleted', $scope.note.id);
      $state.go('notes');
    });
  };

  $scope.$watch('note.title', function (title) {
    if (!title) return;
    if (title.indexOf('blue') !== -1) theme.set('blue');
    if (title.indexOf('black') !== -1) theme.set('black');
  });
});