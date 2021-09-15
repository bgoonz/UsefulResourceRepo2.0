var NotesPage = require('../pages/notes');

describe('notes', function() {
  it('should add a note', function() {
    var notesPage = new NotesPage();
    notesPage.get();

    notesPage.toggleForm();
    notesPage.setTitle('Good note');
    notesPage.setContent('Hello');
    notesPage.submit();

    expect(notesPage.getNotes().last().getText()).toEqual('Good note');
  });
});