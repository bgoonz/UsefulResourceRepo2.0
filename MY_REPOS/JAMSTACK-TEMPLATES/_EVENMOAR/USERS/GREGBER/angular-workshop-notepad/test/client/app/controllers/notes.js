var expect = chai.expect;

describe('NotesCtrl', function () {
  var $httpBackend, $rootScope, scope, createController, requestHandler;

  beforeEach(module('notepad', 'translations', '/views/routes/notes.html'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    requestHandler = $httpBackend.when('GET', '/api/notes');

    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    scope = $rootScope.$new();

    createController = function() {
      return $controller('NotesCtrl', {'$scope': $rootScope});
    };
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch notes', function () {
    requestHandler.respond([{title: 'note'}]);
    $httpBackend.expectGET('/api/notes');
    createController();
    $httpBackend.flush();

    expect(scope.notes).to.length(1);
    expect(scope.notes[0]).to.have.property('title', 'note');
  });

  describe('when a noteDeleted event is emitted', function () {
    beforeEach(function () {
      requestHandler.respond([
        {id: '1', title: 'note'},
        {id: '2', title: 'note'},
        {id: '3', title: 'note'},
        {id: '4', title: 'note'},
      ]);
      $httpBackend.expectGET('/api/notes');
      createController();
      $httpBackend.flush();
    });

    it('should removed the note', function () {
      $rootScope.$broadcast('noteDeleted', '3');
      expect(scope.notes).to.length(3);
      expect(scope.notes[0].id).to.equal('1');
      expect(scope.notes[1].id).to.equal('2');
      expect(scope.notes[2].id).to.equal('4');
    });
  });
});