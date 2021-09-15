# Node.js | process.argv Property - GeeksforGeeks

> A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.

Node.js | process.argv Property

The **process.argv property** is an inbuilt application programming interface of the process module which is used to get the arguments passed to the node.js process when run in the command line.

**Syntax:**

process.argv

**Return Value:** This property returns an array containing the arguments passed to the process when run it in the command line. The first element is the process execution path and the second element is the path for the js file.

Below examples illustrate the use of **process.argv property** in Node.js:

**Example 1:**

  
  

`const process = require(``'process'``);`

`console.log(process.argv);`

**Command to run the code:**

node index.js extra\_argument1 extra\_argument2 3

**Output:**

\[ 'C:\\\\Program Files\\\\nodejs\\\\node.exe',
  'C:\\\\nodejs\\\\g\\\\process\\\\argv\_1.js',
  'extra\_argument1',
  'extra\_argument2',
  '3' 
\]

**Example 2:**

`const process = require(``'process'``);`

`var` `args = process.argv;`

`console.log(``"number of arguments is "``+args.length);`

`args.forEach((val, index) => {`

 ``console.log(`${index}: ${val}`);``

`});`

**Command to run the code:**

node index.js extra\_argument1 extra\_argument2 3

**Output:**

number of arguments is 5
0: C:\\Program Files\\nodejs\\node.exe
1: C:\\nodejs\\g\\process\\argv\_2.js
2: extra\_argument1
3: extra\_argument2
4: 3

**Note:** The above program will compile and run by using the `node filename.js` command followed by arguments.

**Reference:** [https://nodejs.org/api/process.html#process\_process\_argv](https://nodejs.org/api/process.html#process_process_argv)


[Source](https://www.geeksforgeeks.org/node-js-process-argv-property/)