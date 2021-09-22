var
	chalk  = require('chalk'),
	create = require('../lib/client')
	;

function builder(yargs) {}

function handler(argv)
{
	var logger = require('../lib/logger')(argv);
	var dyn = argv.dyn || create(argv);
	var fqdn = argv.fqdn, ip = argv.ip;

	return dyn.session.create()
	.then(function()
	{
		if (argv.replace)
		{
			logger(chalk.red('*** removing node: ') + chalk.blue(fqdn) + chalk.red(' ***'));
			return dyn.node.destroy(fqdn, { rdata: { zone: fqdn }});
		}
	})
	.then(result =>
	{
		logger('creating A record for ' + chalk.blue(fqdn) + ': ' + chalk.green(ip));
		return dyn.record._A.create(fqdn, { rdata: { address: ip }});
	})
	.then(result =>
	{
		return dyn.zone.publish();
	}).then(result  =>
	{
		return dyn.session.destroy();
	}).then(result =>
	{
		logger(chalk.green('Done!'));
	}).catch(err =>
	{
		logger(chalk.red(err));
	});
}

module.exports = {
	command: 'arecord <fqdn> <ip>',
	describe: 'make the given fqdn resolve to the given IP',
	builder: builder,
	handler: handler
};
