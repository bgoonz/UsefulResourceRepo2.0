var
	chalk  = require('chalk'),
	create = require('../lib/client')
	;

function builder(yargs) {}

function handler(argv)
{
	var logger = require('../lib/logger')(argv);
	var dyn = argv.dyn || create(argv);
	var fqdn = argv.fqdn;

	return dyn.session.create()
	.then(function()
	{
		logger(chalk.red('*** removing node: ') + chalk.blue(fqdn) + chalk.red(' ***'));
		return dyn.node.destroy(fqdn, { rdata: { zone: fqdn }});
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
	command: 'delete <fqdn>',
	describe: 'remove the named node entirely',
	builder: builder,
	handler: handler
};
