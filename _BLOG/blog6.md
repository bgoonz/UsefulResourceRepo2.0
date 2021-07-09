[![VithalReddy](https://miro.medium.com/fit/c/96/96/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=post_page-----b9f2455cb6b7--------------------------------)

If you ever wanted to run some automation script or file in your Unix/Linux machine using nodejs?  
It may be to build your binaries from source code or for some tooling in your dev workflow. Nodejs Provides well-matured APIs for doing these operations and there are plenty of npm modules to ease the pain creating shell or terminal based cli’s using nodejs. We will explore both options one by one.

![](https://miro.medium.com/max/1400/1*Zjt0batpaF_HDVvtSnRb7A.jpeg)

We will be using Node.js inbuilt module **_child_process_** for doing this operation.

**For buffered, non-stream formatted output:**

const { exec } = require(‘child_process’);  
exec(‘ls | grep js’, (err, stdout, stderr) =&gt; {  
if (err) {  
//some err occurred  
console.error(err)  
} else {  
// the \*entire\* stdout and stderr (buffered)  
console.log(\`stdout: ${stdout}\`);  
console.log(\`stderr: ${stderr}\`);  
}  
});

**If you want to use promises,**

const util = require(‘util’);  
const exec = util.promisify(require(‘child_process’).exec);  
async function lsWithGrep() {  
try {  
const { stdout, stderr } = await exec(‘ls | grep js’);  
console.log(‘stdout:’, stdout);  
console.log(‘stderr:’, stderr);  
}catch (err)=&gt;{  
console.error(err);  
};  
};  
lsWithGrep();

**If you want to use output stream,**

const { spawn } = require(‘child_process’);  
const child = spawn(‘ls’, );  
// use child.stdout.setEncoding(‘utf8’); if you want text chunks  
child.stdout.on(‘data’, (chunk) =&gt; {  
// data from the standard output is here as buffers  
});  
// since these are streams, you can pipe them elsewhere  
child.stderr.pipe(dest);  
child.on(‘close’, (code) =&gt; {  
console.log(\`child process exited with code ${code}\`);  
});

**if you want to execute shell script synchronously,**

Then check out following APIs:

const { execSync } = require(‘child_process’);  
// stderr is sent to stdout of parent process  
// you can set options.stdio if you want it to go elsewhere  
const stdout = execSync(‘ls’);  
const { spawnSync} = require(‘child_process’);  
const child = spawnSync(‘ls’, );  
console.error(‘error’, child.error);  
console.log(‘stdout’, child.stdout);  
console.error(‘stderr’, child.stderr);

if you want to execute whole shell script file, instead of commands, Then see the following code,  
You can use any of the above methods to achieve this functionality.

const exec = require(‘child_process’).exec, child;  
const myShellScript = exec(‘sh doSomething.sh /myDir’);  
myShellScript.stdout.on(‘data’, (data)=&gt;{  
console.log(data);  
// do whatever you want here with data  
});  
myShellScript.stderr.on(‘data’, (data)=&gt;{  
console.error(data);  
});

Nodejs Documentation for this can found [here.](https://nodejs.org/api/child_process.html)

you can use **child_process.execFile** method also to executing file.

If you want to use, third-party npm modules, then check out:

- [ShellJS](https://www.npmjs.com/package/shelljs)
- [cli](https://www.npmjs.com/package/cli)

You can find many more in npmjs.com

Now you can do some scripting Node.js. Happy scripting. These Methods come pretty handily when you’re building custom dev workflow or you want to do some automation when in the workflow.

This article first appeared on [stackfame.com programming blog](https://stackfame.com/run-shell-script-file-or-command-nodejs).
