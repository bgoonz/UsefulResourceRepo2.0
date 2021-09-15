var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');
var uuid = require('uuid');
var rethinkOdm = require('../');

describe('Model', function () {
  var User, ro;

  before(function () {
    ro = rethinkOdm();
    User = ro.createModel({tableName: 'users'});
  });

  before(function (done) {
    ro.run(ro.r.tableList())
    .then(function (tables) {
      if (tables.indexOf('users') === -1)
        return ro.run(ro.r.tableCreate('users'));
    })
    .nodeify(done);
  });

  after(function (done) {
    ro.run(ro.r.tableList())
    .then(function (tables) {
      if (tables.indexOf('users') !== -1)
        return ro.run(ro.r.tableDrop('users'));
    })
    .nodeify(done);
  });

  after(function () {
    ro.close();
  });

  describe('=getTable', function () {
    it('should return the table', function (done) {
      ro.run(User.table().get('x'))
      .then(function (user) {
        expect(user).to.be.null;
      })
      .nodeify(done);
    });
  });

  describe('#toJSON', function () {
    it('should only return model attributes', function () {
      var user = new User({name: 'Johnny'});
      expect(user.toJSON()).to.eql({name: 'Johnny'});
    });
  });

  describe('hooks', function () {
    it('should be possible to add hooks', function () {
      var insertSpy = sinon.spy();
      var Book = ro.createModel({
        tableName: 'books',
        hooks: {
          insert: insertSpy
        }
      });
      var book = new Book();

      book.emit('insert', 'test');
      expect(insertSpy).to.be.calledWith('test');
    });
  });

  describe('#insert', function () {
    before(function (done) {
      ro.run(ro.r.table('users').insert({id: 'a'})).nodeify(done);
    });

    it('should insert (without id)', function (done) {
      var user = new User({name: 'Johnny'});
      user.insert()
      .then(function (user) {
        expect(user).to.be.instanceOf(User);
        expect(user).to.have.property('id');
        expect(user).to.have.property('name', 'Johnny');
      })
      .nodeify(done);
    });

    it('should insert (with id)', function (done) {
      var id = uuid();
      var user = new User({id: id, name: 'Johnny'});
      user.insert()
      .then(function (_user) {
        expect(_user).to.equal(user);
        expect(_user).to.have.property('id', id);
        expect(_user).to.have.property('name', 'Johnny');
      })
      .nodeify(done);
    });

    it('should handle errors', function (done) {
      var id = 'a';
      var user = new User({id: id, name: 'Johnny'});
      user.insert()
      .catch(function (err) {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.match(/Duplicate primary key/);
      })
      .nodeify(done);
    });

    it('should emit events', function (done) {
      var insertSpy = sinon.spy();
      var insertedSpy = sinon.spy();
      var user = new User({name: 'Marco'});
      user.on('insert', insertSpy);
      user.on('inserted', insertedSpy);

      var insert = user.insert();

      insert.then(function () {
        expect(insertSpy).to.be.calledWith(user);
        expect(insertedSpy).to.be.calledWith(user);
      })
      .nodeify(done);
    });

    it('should be possible to throw errors in event', function (done) {
      var user = new User({name: 'Marco'});
      user.on('insert', function () {
        throw new Error('error');
      });

      user.insert()
      .nodeify(function (err) {
        expect(err.message).to.equal('error');
        done();
      });
    });
  });

  describe('#update', function () {
    before(function (done) {
      ro.run(ro.r.table('users').insert({id: 'b'})).nodeify(done);
    });

    it('should update in database', function (done) {
      var user = new User({id: 'b', foo: 'bar'});
      user.update()
      .then(function (_user) {
        expect(_user).to.equal(user);
        expect(_user).to.have.property('id', 'b');
        expect(_user).to.have.property('foo', 'bar');
      })
      .nodeify(done);
    });

    it('should be possible to specify data', function (done) {
      var user = new User({id: 'b', a: 'a', b: 'b'});
      user.update({c: 'c'})
      .then(function (_user) {
        expect(_user).to.equal(user);
        expect(_user).to.have.property('id', 'b');
        expect(_user).to.have.property('a', 'a');
        expect(_user).to.have.property('b', 'b');
        expect(_user).to.have.property('c', 'c');
      })
      .then(function () {
        return ro.run(ro.r.table('users').get('b'));
      })
      .then(function (userInDb) {
        expect(userInDb).to.have.property('id', 'b');
        expect(userInDb).to.not.have.property('a');
        expect(userInDb).to.not.have.property('b');
        expect(userInDb).to.have.property('c', 'c');
      })
      .nodeify(done);
    });

    it('should handle "Not found" errors', function (done) {
      var user = new User({id: 'x', foo: 'bar'});
      user.update()
      .nodeify(function (err) {
        expect(err.message).to.equal('Not found');
        done();
      });
    });

    it('should emit events', function (done) {
      var updateSpy = sinon.spy();
      var updatedSpy = sinon.spy();
      var user = new User({id: 'b', name: 'Marco'});
      user.on('update', updateSpy);
      user.on('updated', updatedSpy);

      var update = user.update();

      update.then(function () {
        expect(updateSpy).to.be.calledWith(user, {id: 'b', name: 'Marco'});
        expect(updatedSpy).to.be.calledWith(user, {id: 'b', name: 'Marco'});
      })
      .nodeify(done);
    });

    it('should be possible to throw errors in event', function (done) {
      var user = new User({id: 'b', name: 'Marco'});
      user.on('update', function () {
        throw new Error('error');
      });

      user.update()
      .nodeify(function (err) {
        expect(err.message).to.equal('error');
        done();
      });
    });
  });

  describe('#delete', function () {
    before(function (done) {
      ro.run(ro.r.table('users').insert({id: 'c'}))
      .then(function () {
        return ro.run(ro.r.table('users').insert({id: 'd'}));
      })
      .nodeify(done);
    });

    it('should delete the document', function (done) {
      var user = new User({id: 'c'});
      user.delete()
      .then(function () {
        return ro.run(ro.r.table('users').get('c'));
      })
      .then(function (userInDb) {
        expect(userInDb).to.be.null;
      })
      .nodeify(done);
    });

    it('should emit events', function (done) {
      var deleteSpy = sinon.spy();
      var deletedSpy = sinon.spy();
      var user = new User({id: 'd', name: 'Marco'});
      user.on('delete', deleteSpy);
      user.on('deleted', deletedSpy);

      var del = user.delete();

      del.then(function () {
        expect(deleteSpy).to.be.calledWith(user);
        expect(deletedSpy).to.be.calledWith(user);
      })
      .nodeify(done);
    });

    it('should be possible to throw errors in event', function (done) {
      var user = new User({id: 'd', name: 'Marco'});
      user.on('delete', function () {
        throw new Error('error');
      });

      user.delete()
      .nodeify(function (err) {
        expect(err.message).to.equal('error');
        done();
      });
    });

    it('should do nothing if document is not found', function (done) {
      var user = new User({id: 'xxx'});
      user.delete()
      .nodeify(function (err) {
        expect(err).to.not.exists;
        done();
      });
    });
  });
});