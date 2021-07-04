# Node.js: writing shell scripts using modern JavaScript instead of Bash

> After another case of the need of making changes in Bash script and battling with its syntax and docs I banged myself: “Enough! Let’s use…

[![Vladimir Tolstikov](https://miro.medium.com/fit/c/96/96/0*WzuIRCFU3GvcbK9Y.)](https://medium.com/@vladimirtolstikov?source=post_page-----774e0859f965--------------------------------)

![Image for post](https://miro.medium.com/freeze/max/60/1*kQR_AocWuFiXMtHMctjUYA.gif?q=20)

![Image for post](https://miro.medium.com/max/2368/1*kQR_AocWuFiXMtHMctjUYA.gif)

After another case of the need of making changes in Bash script and battling with its syntax and docs I banged myself: “Enough! Let’s use the power of JavaScript!”. Since the rest of codebase in project using JS, that seemed a good idea.

_All the code below will work mostly only in Unix-like OSes as MacOS and Linux._

*   lightweight, no deps or minimum
*   easy to write
*   same console output as if using Bash

I started from searching inside Node.js API. `exec` appeared to be not so good choice for several reasons, but `[**spawn**](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)` seemed promising because of one important feature: ability to inherit stdio and immediately echo all the command output right to the console during command execution when using `{stdio: 'inherit'}` in options.

Also we will need an easy way to parse possible script params as for example `--skip-ios` or `-d 1` which is not a simple task. For all that we will use [**Yargs**](http://yargs.js.org/) — Node.js library which helps not only to easily parse passed console params but also allows to check for required params and build structured help menu for your shell script in no time.

Since `spawn` API method requires bunch of boilerplate code, we’re going to write helper wrapper function so can use it easily. It’s 2K19 and we ofc will use native **Promises** and **async/await** to streamline our code. Also I prefer TypeScript, but using it here would be not so lightweight, so passing with it for now.

After several iterations and debugging, we have next (as `utils.js` file):

With that, shell commands can be executed as simple as:  
`await exec('rm -rf ./dist');`

`capture` option can be used to capture command output:  
`const date = (await exec('date', {capture: true})).data;`  
`console.log(date);`

`echo` option can be used for debugging or making your scripts a bit more verbose.

Exported function can be used in next way to write your custom shell scripts (as `deploy.js` file):

_Note: you’ll need to install Yargs with_ `_npm install yargs --save-dev_`

Code above is self-explanatory. As you see, all is simple now with use async/await and you can use full power of JavaScript there without having headache :)

Result script can be added to scripts section of package.json as:

"deploy": "node ./scripts/deploy.js",  
"deploy:integration": "npm run deploy -- integration",  
"deploy:staging": "npm run deploy -- staging",  
"deploy:production": "npm run deploy -- production"

and can be used in a next way:

yarn deploy:integration  
yarn deploy integration  
yarn deploy integration --skip-build  
yarn deploy --helpnpm run deploy:integration  
npm run deploy -- integration  
npm run deploy -- integration --skip-build  
npm run deploy -- --help

As you see, passing of additional params is more intuitive when using Yarn. I hope that helped and will speedup your development. Thanks :)


[Source](https://blog.cloudboost.io/node-js-writing-shell-scripts-using-modern-javascript-instead-of-bash-774e0859f965)