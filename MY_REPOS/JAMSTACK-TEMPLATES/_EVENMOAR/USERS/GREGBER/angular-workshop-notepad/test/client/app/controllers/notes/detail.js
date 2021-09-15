var expect = chai.expect;

describe('NotesDetailCtrl', function() {
  var $httpBackend, $state, $rootScope, scope, createController;

  beforeEach(module('notepad', 'translations', '/views/routes/notes.html'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/notes/1')
      .respond({id: '1', title: 'note'});
    $httpBackend.when('DELETE', '/api/notes/1')
      .respond(null);

    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');
    var $controller = $injector.get('$controller');
    var $stateParams = $injector.get('$stateParams');
    $stateParams.id = 1;
    scope = $rootScope.$new();

    createController = function() {
      return $controller('NotesDetailCtrl', {'$scope': $rootScope});
    };
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get note', function () {
    $httpBackend.expectGET('/api/notes/1');
    createController();
    $httpBackend.flush();

    expect(scope.note).to.have.property('title', 'note');
  });

  describe('#remove', function () {
    beforeEach(function () {
      $httpBackend.expectGET('/api/notes/1');
      createController();
      $httpBackend.flush();
    });

    it('should remove note', function () {
      scope.delete();
      $httpBackend.expectDELETE('/api/notes/1');
      $httpBackend.flush();
    });

    it('should emit an event', function () {
      var spy = sinon.spy();

      $rootScope.$on('noteDeleted', spy);
      scope.delete();
      $httpBackend.expectDELETE('/api/notes/1');
      $httpBackend.flush();

      expect(spy).to.be.called;
    });

    it('should redirect to the notes state', function () {
      scope.delete();
      $httpBackend.expectDELETE('/api/notes/1');
      $httpBackend.flush();

      expect($state.current.name).to.equal('notes');
    });
  });
});