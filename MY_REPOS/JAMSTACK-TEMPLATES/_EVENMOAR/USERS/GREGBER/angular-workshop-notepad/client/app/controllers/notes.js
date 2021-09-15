window.notepad.controllers.controller('NotesCtrl', function ($scope, Note, $state, $translate) {
  $scope.createNote = function () {
    if ($scope.noteForm.$invalid) return ;
    $scope.notes.push($scope.note);
    $scope.note.$save().then(function (note) {
      $state.go('notes.detail', {id: note.id});
    });
    $scope.reset();
  };

  $scope.reset = function () {
    $scope.note = new Note();
  };

  $scope.notes = Note.query();
  $scope.reset();

  $scope.$on('noteDeleted', function (event, id) {
    var note = $scope.notes.filter(function (note) {
      return note.id === id;
    })[0];
    if (!note) return;

    var index = $scope.notes.indexOf(note);
    if (index === -1) return;

    $scope.notes.splice(index, 1);
  });
});