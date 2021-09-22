# Yargs be a node.js library fer hearties tryin' ter parse optstrings.

> the yargs.js.org website.

What's Yargs?

Yargs helps you build interactive command line tools by parsing arguments and generating an elegant user interface.

Yargs gives you:

*   commands and (grouped) options (like module run -n --force),
*   a dynamically generated help menu based on your arguments,
*   bash-completion shortcuts for commands and options,
*   and much more.

With these features, and many more, yargs allows you to focus on building your program without worrying about your args.

Install

Open your terminal, navigate to your project, and run using npm:

$ npm install --save yargs

Getting Started

After creating example.js start with the following code to get you going:

          `#!/usr/bin/env node

require('yargs')
  .scriptName("pirate-parser")
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .argv` 
        

And in your terminal run:

          `$ node example.js --help` 
        

To get this output:

          `pirate-parser <cmd> [args]

  Commands:
    pirate-parser hello [name]  welcome ter yargs!

  Options:
    --help  Show help                                                    [boolean]` 
        

Run hello command:

          `$ node example.js hello --name Parrot
  hello Parrot welcome to yargs!`


[Source](http://yargs.js.org/)