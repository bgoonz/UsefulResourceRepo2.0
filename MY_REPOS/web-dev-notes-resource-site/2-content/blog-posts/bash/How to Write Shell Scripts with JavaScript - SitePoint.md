# How to Write Shell Scripts with JavaScript - SitePoint

> JavaScript is well suited to desktop scripting tasks. James Hibbard looks at how you can leverage JavaScript's power to write your own shell scripts.

_“How to Write Shell Scripts with JavaScript” is the editorial from our latest JavaScript newsletter._

This week I had to upgrade a client’s website to use SSL. This wasn’t a difficult task in itself — installing the certificate was just the click of a button — yet once I had made the switch, I was left with a lot of [mixed content warnings](https://www.howtogeek.com/181911/htg-explains-what-exactly-is-a-mixed-content-warning/). Part of fixing these meant that I had to go through the theme directory (it was a WordPress site) and identify all of the files in which assets were being included via HTTP.

Previously, I would have used a small Ruby script to automate this. Ruby was the first programming language I learned and is ideally suited to such tasks. However, we recently published an article on [using Node to create a command-line interface](https://www.sitepoint.com/scaffolding-tool-caporal-js/). This article served to remind me that JavaScript has long since grown beyond the browser and can (amongst many other things) be used to great effect for desktop scripting.

In the rest of this post, I’ll explain how to use JavaScript to recursively iterate over the files in a directory and to identify any occurrences of a specified string. I’ll also offer a gentle introduction to writing shell scripts in JavaScript and put you on the road to writing your own.

### Set Up

The only prerequisite here is Node.js. If you don’t have this installed already, you can head over to their website and [download one of the binaries](https://nodejs.org/en/download/). Alternatively, you can use a version manager such as nvm. We’ve got a tutorial on that [here](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).

Your First Shell Script
-----------------------

So where to begin? The first thing we need to do is iterate over all of the files in the theme directory. Luckily Node’s native File System module comes with a [readdir method](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback) we can use for that. It takes the directory path and a callback function as parameters. The callback gets two arguments (`err` and `entries`) where `entries` is an array of the names of the `entries` in the directory excluding `.` and `..` — the current directory and the parent directory, respectively.

    const fs = require('fs');
    
    function buildTree(startPath) {
      fs.readdir(startPath, (err, entries) => {
        console.log(entries);
      });
    }
    
    buildTree('/home/jim/Desktop/theme');
    

_If you’re following along with this, save the above in a file named `search_and_replace.js` and run it from the command line using `node search_and_replace.js`. You’ll also need to adjust the path to whichever directory you are using._

Adding Recursion
----------------

So far so good! The above script logs the directory’s top level entries to the console, but my theme folder contained subdirectories which also had files that needed processing. That means that we need to iterate over the array of entries and have the function call itself for any directories it encounters.

To do this, we first need to work out if we are dealing with a directory. Luckily the File System module has a method for that, too: [lstatSync](https://nodejs.org/docs/latest/api/fs.html#fs_fs_lstatsync_path). This returns an [fs.Stats](https://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) object, which itself has an `isDirectory` method. This method returns `true` or `false` accordingly.

Note that we’re using the synchronous version of `lstat` here. This is fine for a throwaway script, but the asynchronous version should be preferred if performance matters.

    const fs = require('fs');
    
    function buildTree(startPath) {
      fs.readdir(startPath, (err, entries) => {
        console.log(entries);
        entries.forEach((file) => {
          const path = `${startPath}/${file}`;
    
          if (fs.lstatSync(path).isDirectory()) {
            buildTree(path);
          }
        });
      });
    }
    
    buildTree('/home/jim/Desktop/theme');
    

_If you run the script, you will now see that it prints a list of files and folders for the current directory and every subdirectory that it contains. Success!_

Identifying Files to Process
----------------------------

Next, we need to add some logic to identify any PHP files, open them up and search them for any occurrences of the string we are looking for. This can be done using a simple regular expression to check for file names that end in “.php”, then calling a `processFile` function if that condition is met, passing it the current path as an argument.

Let’s also make a small improvement to how the pathname is constructed. Until now we’ve been using string interpolation, but this will only work in a Unix environment due to the forward slash. Node’s path module however, offers a [join method](https://nodejs.org/api/path.html#path_path_join_paths), which will take the separator into account.

    const fs = require('fs');
    const Path = require('path');
    
    function processFile(path) {
      console.log(path);
    }
    
    function buildTree(startPath) {
      fs.readdir(startPath, (err, entries) => {
        entries.forEach((file) => {
          const path = Path.join(startPath, file);
    
          if (fs.lstatSync(path).isDirectory()) {
            buildTree(path);
          } else if (file.match(/\.php$/)) {
            processFile(path);
          }
        });
      });
    }
    
    buildTree('/home/jim/Desktop/theme');
    

_If you run the script at this point, it should recurse a directory tree and print out the path of any php files it might find._

Searching for Text within a File
--------------------------------

All that remains to do is to open up the files that the script finds and to process them. This can be done using Node’s [readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options) method which accepts the file path and its encoding (optional) as parameters. If the encoding is specified then this function returns a string. Otherwise it returns a buffer.

Now we can read the contents of a file into a variable, which we can then split on every newline character and iterate over the resulting array. After that, it’s a simple matter of using JavaScript’s match method to look for the word or phrase we want:

    function processFile(path) {
      const text = fs.readFileSync(path, 'utf8');
      text.split(/\r?\n/).forEach((line) => {
        if (line.match('http:\/\/')) {
          console.log(line.replace(/^\s+/, ''));
          console.log(`${path}\n`);
        }
      });
    }
    

_If you run the script now, it’ll print out every line where it finds a match as well as the name of the file._

Taking It Further
-----------------

In my particular case this was enough. The script spat out a handful of occurrences of “http” which I was able to fix by hand. Job done! It would however, be simple to automate the process using `replace()` and [fs.writeFileSync](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options) to alter every occurrence and write the new contents back to a file. You could also use [child\_process.exec](https://nodejs.org/docs/latest/api/child_process.html#child_process_child_process_exec_command_options_callback) to open up the files in Sublime ready for editing:

    const exec = require('child_process').exec;
    ...
    exec(`subl ${path}`)
    

This kind of scripting lends itself to a whole bunch of tasks, not just manipulating text files. For example, maybe you want to batch rename a bunch of music tracks, or delete every `Thumbs.db` file from a directory. Maybe you want to fetch data from a remote API, parse a CSV file, or generate files on the fly. The list goes on …

![](https://cdn.sanity.io/images/708bnrs8/production/ae4da31c7000675da4d2091a4d0a1a41a79a7e4d-1402x1843.png?w=165&h=217&fit=crop)

### Learn PHP for free!

Make the leap into server-side programming with a comprehensive cover of PHP & MySQL.

Normally

~RRP $39.99~

**Yours absolutely free**

You can also make the JavaScript files executable, so that they run when you click on them. Axel Rauschmayer goes into this on his post [Write your shell scripts in JavaScript, via Node.js](http://2ality.com/2011/12/nodejs-shell-scripting.html).

Conclusion
----------

And there we have it. I’ve demonstrated how to use JavaScript to recurse through a directory tree and manipulate a subset of the files contained within. It’s a simple example, but it serves to emphasize the point that JavaScript can be used for a whole host of tasks outside of the browser, desktop scripting being one of them.

Now its over to you. Do you automate scripting tasks with JavaScript? If not do you have a different preferred language, or are you a bash purist? What kind of tasks do you automate? Let me know in the comments below.


[Source](https://www.sitepoint.com/shell-scripts-javascript/)