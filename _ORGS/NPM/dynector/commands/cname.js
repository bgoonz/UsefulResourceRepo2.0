var
	chalk  = require('chalk'),
	create = require('../lib/client')
	;

function builder(yargs) {}

function handler(argv)
{
	var logger = require('../lib/logger')(argv);
	var dyn = argv.dyn || create(argv);
	var fqdn = argv.fqdn, cname = argv.cname;

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
		logger('adding cname for ' + chalk.blue(fqdn) + ': ' + chalk.green(cname));
		return dyn.record._CNAME.create(argv.fqdn, { rdata: { cname: argv.cname }});
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
	command: 'cname <fqdn> <cname>',
	describe: 'make the given fqdn resolve to the given cname ',
	builder: builder,
	handler: handler
};
