var
	create = require('../lib/client'),
	dns    = require('dns'),
	P      = require('bluebird')
	;

var lookupP = P.promisify(dns.lookup);

function mapper(fqdn, idx, len)
{
	var result = {
		fqdn: fqdn,
		addresses: [],
	};
	return lookupP(fqdn).then(addresses =>
	{
		result.addresses = addresses;
		return result;
	})
	.catch(err =>
	{
		if (err.code === 'ENOTFOUND') return result;
		throw err;
	});
}

function builder(yargs) {}

function handler(argv)
{
	var dyn = argv.dyn || create(argv);
	return dyn.session.create().then(result =>
	{
		return dyn.record._All.list();
	}).then(result =>
	{
		var records = {};
		result.forEach(item =>
		{
			records[item.fqdn] = item.type;
		});

		return P.map(Object.keys(records).sort(), mapper);
	}).then(results =>
	{
		var ips = [];
		results.forEach(item =>
		{
			ips = ips.concat(item.addresses);
		});
		ips = ips.sort();
		ips.forEach(item => console.log(item));
		return dyn.session.destroy();
	})
	.catch(err =>
	{
		console.log(err);
	});
}

module.exports = {
	command: 'resolve <zone>',
	describe: 'resolve all records for the given zone; list the IPs',
	builder: builder,
	handler: handler
};
