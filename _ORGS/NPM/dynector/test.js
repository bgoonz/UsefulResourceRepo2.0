/*global describe:true, it:true, before:true, after:true, beforeEach: true, afterEach:true */
'use strict';

var
	demand        = require('must'),
	P             = require('bluebird'),
	sinon         = require('sinon'),
	arecordmod    = require('./commands/arecord'),
	cnamemod      = require('./commands/cname'),
	deletemodule  = require('./commands/delete'),
	listmodule    = require('./commands/list'),
	resolvemodule = require('./commands/resolve'),
	createClient  = require('./lib/client')
	;

describe('dynector', function()
{
	function makeMock()
	{
		return {
			record:
			{
				_A: { create: sinon.spy() },
				_CNAME: { create: sinon.spy() },
				_All: { list: function() { return P.resolve([]); } },
			},
			node: { destroy: sinon.spy() },
			session:
			{
				create: function() { return P.resolve('ok'); },
				destroy: function() { return P.resolve('ok'); },
			},
			zone:
			{
				publish: function() { return P.resolve('ok'); },
			}
		};
	}

	describe('determineZone', function()
	{
		it('returns opts.zone if passed in', function()
		{
			var argv = { zone: 'foo', silent: true };
			createClient.determineZone(argv).must.equal('foo');
		});

		it('returns the last two segments of opts.host', function()
		{
			var argv = { fqdn: 'foo.bar.com', silent: true };
			createClient.determineZone(argv).must.equal('bar.com');
		});

		it('returns opts.host if it has only two segments', function()
		{
			var argv = { fqdn: 'foo.bar', silent: true };
			createClient.determineZone(argv).must.equal('foo.bar');
		});
	});

	describe('cname', function()
	{
		it('calls _CNAME.create', function(done)
		{
			var dynMock = makeMock();
			var spy = dynMock.record._CNAME.create;
			var argv = { cname: 'two.bar.com', fqdn: 'foo.bar.com', dyn: dynMock, silent: true };
			cnamemod.handler(argv).then(function()
			{
				spy.called.must.be.true();
				spy.calledWith('foo.bar.com', { rdata: { cname: 'two.bar.com'}}).must.be.true();
				done();
			}).done();
		});
	});

	describe('arecord', function()
	{
		it('calls _A.create', function(done)
		{
			var dynMock = makeMock();
			var spy = dynMock.record._A.create;
			var argv = { ip: '10.0.0.1', fqdn: 'foo.bar.com', dyn: dynMock, silent: true };
			arecordmod.handler(argv).then(function()
			{
				spy.called.must.be.true();
				spy.calledWith('foo.bar.com', { rdata: { address: '10.0.0.1'}}).must.be.true();
				done();
			}).done();
		});
	});

	describe('delete', function()
	{
		it('calls node.destroy', function(done)
		{
			var dynMock = makeMock();
			var spy = dynMock.node.destroy;
			var argv = { fqdn: 'foo.bar.com', dyn: dynMock, silent: true };
			deletemodule.handler(argv).then(function()
			{
				spy.called.must.be.true();
				spy.calledWith('foo.bar.com').must.be.true();
				done();
			}).done();
		});
	});

	describe('list', function()
	{
		it('calls record._All.list', function(done)
		{
			var dynMock = makeMock();
			var spy = sinon.spy(dynMock.record._All, 'list');
			var argv = { zone: 'bar.com', dyn: dynMock, silent: true };
			listmodule.handler(argv).then(function()
			{
				spy.called.must.be.true();
				spy.restore();
				done();
			}).done();
		});
	});

	describe('resolve', function()
	{
		it('calls record._All.list', function(done)
		{
			var dynMock = makeMock();
			var spy = sinon.spy(dynMock.record._All, 'list');
			var argv = { zone: 'bar.com', dyn: dynMock, silent: true };
			resolvemodule.handler(argv).then(function()
			{
				spy.called.must.be.true();
				spy.restore();
				done();
			}).done();
		});
	});
});
