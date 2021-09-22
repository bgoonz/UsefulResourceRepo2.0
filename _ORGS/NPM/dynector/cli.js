#!/usr/bin/env node

var updater = require('update-notifier'),
	pkg     = require('./package.json');

updater({pkg: pkg}).notify();

var yargs = require('yargs')
	.usage('dynector: conveniences for interacting with the dynect API')
	.option('zone',
	{
		alias: 'z',
		description: 'specify a zone',
		global: true
	})
	.option('replace',
	{
		alias: 'r',
		describe: 'remove the node before acting',
		type: 'boolean',
		global: true
	})
	.option('silent',
	{
		describe: 'do not log informationally',
		type: 'boolean',
		global: true
	})
	.example('dynector arecord example.com 10.0.0.1', 'make example.com resolve to 10.0.0.1')
	.example('dynector cname www.example.com example.com', 'make www.example.com resolve to example.com')
	.example('dynector cname oops.example.com example.com', 'make oops resolve to example.com')
	.example('dynector delete oops.example.com', 'remove the entry for oops entirely')
	.example('dynector list example.com', 'list all records under example.com')
	.example('dynector resolve example.com', 'resolve IPs for all example.com records')
	.version()
	.help()
	;

yargs.command(require('./commands/arecord.js'));
yargs.command(require('./commands/cname.js'));
yargs.command(require('./commands/delete.js'));
yargs.command(require('./commands/list.js'));
yargs.command(require('./commands/resolve.js'));

yargs.recommendCommands();

yargs.argv;
