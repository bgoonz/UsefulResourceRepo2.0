#!/usr/bin/env node

var chalk = require('chalk')
var inquirer = require('inquirer')

require('yargs')
  .usage('$0 <cmd> [options]')
  .command('list', 'show the packages that would be displayed on the home page', function () {
    var npmExplicitInstalls = require('../')
    npmExplicitInstalls.client.on('connect', function () {
      npmExplicitInstalls(function (err, pkgs) {
        if (err) {
          console.log(chalk.red(err.message))
          return
        }

        pkgs.forEach(function (pkg) {
          console.log(chalk.green(pkg.name), '(' + pkg.version + ')', chalk.gray(pkg.publisher.name))
        })
        npmExplicitInstalls.client.end(true)
      })
    })
  })
  .command('delete', 'delete packages from the home page', function () {
    var npmExplicitInstalls = require('../')
    inquirer.prompt({
      name: 'package',
      message: 'remove package from homepage',
      type: 'list',
      choices: npmExplicitInstalls.getPackagesSync()
    }).then(function (answer) {
      npmExplicitInstalls.delete(answer.package)
      npmExplicitInstalls.client.end(true)
    })
  })
  .command('add', 'add a new package to the home page', function () {
    var npmExplicitInstalls = require('../')
    inquirer.prompt([
      {
        name: 'package',
        message: 'name of package to add',
        validate: function (input) {
          if (!input.length) return 'you must provide a package name'
          else return true
        }
      },
      {
        name: 'logo',
        message: 'url of icon to use for package (optional)'
      }
    ]).then(function (answer) {
      npmExplicitInstalls.add(answer.package, answer.logo)
      npmExplicitInstalls.client.end(true)
    })
  })
  .command('bust-cache', 'clear the cache of home page packages', function () {
    var npmExplicitInstalls = require('../')
    npmExplicitInstalls.client.on('connect', function () {
      npmExplicitInstalls.bustCache(function (err) {
        if (err) {
          console.log(chalk.red(err.message))
          return
        }
        console.log(chalk.green('cache cleared'))
        npmExplicitInstalls.client.end(true)
      })
    })
  })
  .help('help')
  .alias('h', 'help')
  .demand(1, 'you must provide a command to run')
  .argv
