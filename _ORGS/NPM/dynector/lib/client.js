var
	assert = require('assert'),
	Dyn    = require('dyn-js')
	;

var determineZone = function determineZone(argv)
{
	var PATT = /\.(\w+)\.(\w+)$/;
	var zone = argv.zone;
	if (!zone)
	{
		zone = argv.fqdn;
		var matches = argv.fqdn.match(PATT);
		if (matches)
			zone = matches[1] + '.' + matches[2];
	}

	return zone;
};

function createClient(argv)
{
	assert(process.env.DYN_CUSTOMER, 'you must set your dyn customer in the DYN_CUSTOMER env var');
	assert(process.env.DYN_USER, 'you must set your dyn username in the DYN_USER env var');
	assert(process.env.DYN_PASSWORD, 'you must set your dyn password in the DYN_PASSWORD env var');

	var zone = determineZone(argv);
	if (!argv || !argv.silent) console.log('operating on zone ' + zone);
	if (zone === argv.fqdn)
	{
		console.error('zone is same as hostname! declining to let you shoot yourself in the foot.');
		console.error('zone: ' + zone + '; host: ' + argv.fqdn);
		process.exit(1);
	}

	var client = Dyn({
		traffic: {
			customer_name: process.env.DYN_CUSTOMER,
			user_name:     process.env.DYN_USER,
			password:      process.env.DYN_PASSWORD
		}
	});
	return client.traffic.withZone(zone);
}

module.exports = createClient;
createClient.determineZone = determineZone;
