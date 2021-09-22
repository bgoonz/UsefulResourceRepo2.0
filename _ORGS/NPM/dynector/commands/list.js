var
	chalk  = require('chalk'),
	create = require('../lib/client')
	;

function builder(yargs) {}

function handler(argv)
{
	var dyn = argv.dyn || create(argv);
	var logger = require('../lib/logger')(argv);
	return dyn.session.create().then(result =>
	{
		return dyn.record._All.list();
	}).then(result =>
	{
		result.forEach(item =>
		{
			console.log(`${item.fqdn} : ${item.type}`);
		});

		return dyn.session.destroy();
	}).then(result =>
	{
		logger(chalk.green('Done!'));
	}).catch(err =>
	{
		logger(err);
	});
}

module.exports = {
	command: 'list <zone>',
	describe: 'list all records for the given zone',
	builder: builder,
	handler: handler
};
