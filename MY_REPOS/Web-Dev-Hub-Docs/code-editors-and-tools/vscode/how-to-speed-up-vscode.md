# How To Speed Up Vscode





## - Extensions Rock -

VS Code users \(and there are a lot of us\) just love our extensions. There are [thousands of VS Code extension to choose from](https://marketplace.visualstudio.com/vscode?wt.mc_id=devto-blog-jopapa) and many of us have several installed. They do everything from lighting up your favorite language, formatting your code, or even colorizing your theme.

Have you ever noticed that some extensions take a few moments to initialize as you start VS Code? What might cause this delay?

> What can you do about it? A lot actually. Stay with me to see how you can help your favorite extensions load fast!

One possible cause is the number of files or the size of the extension. Some extensions have so much functionality in them that they can slow down over time.

### Wait, Why is that?

When we build apps for the web, we write dozens or hundreds of files in JavaScript, CSS, and HTML. We don't want to send 1,000 files across the web to a browser as it may be a poor experience of waiting and waiting. When we write our code it isn't optimized for the browser quite as much as it can be, either. Modern tools help us solve this by compressing the files into a single \(or a small set\) of files. One popular tool is [WebPack](https://webpack.js.org/).

If you use the command to "Developer: Show Running Extensions" you will see a list of the activated extensions in your VS Code instance. You will also see, to the right, how long each extension took to activate in ms.

[![Show Running Extensions](https://res.cloudinary.com/practicaldev/image/fetch/s--0aI_rnKb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/rlw2qutmcmcjf3b4nrv8.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--0aI_rnKb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/rlw2qutmcmcjf3b4nrv8.png)

This is a great way to find out which ones may be slower activating. Notice the list below from my instance of VS Code shows a few of my installed extensions and their activation times. Obviously, some take longer than others to load, because they do more.

[![Running Extensions](https://res.cloudinary.com/practicaldev/image/fetch/s--X7Wr82s3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/muapn5ojr6tuevo1gsvv.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--X7Wr82s3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/muapn5ojr6tuevo1gsvv.png)

What can you do if one is taking too long for your tastes? \(maybe 1000ms?\)

### Making Extensions Faster

Recently the VS Code team released the ability to [use WebPack to bundle the files in extensions](https://code.visualstudio.com/updates/v1_32#_bundling-extensions-with-webpack?wt.mc_id=devto-blog-jopapa).

The article covers it all really, and it can help when packaging an extension.

I found that my [Peacock extension](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock&wt.mc_id=devto-blog-jopapa) was putting 48 files in the package. I made a few tweaks and I cut this down by a lot.

First, I added some file to the `.vscodeignore` file  


```text
# Files I excluded
azure-pipelines.yml
ISSUE_TEMPLATE.md
PULL_REQUEST_TEMPLATE.md
vsc-extension-quickstart.md
node_modules/**/test/**

# After webpack, we have more to ignore
node_modules
out/
src/
tsconfig.json
webpack.config.json
```

Then I created a new branch for my extension. I went through the steps in the [VS Code docs](https://code.visualstudio.com/updates/v1_32#_bundling-extensions-with-webpack?wt.mc_id=devto-blog-jopapa) to update my project to use WebPack.

My goals were to make all of these still work:

* packaging with `npm run package`
* publishing with `npm run publish`
* local and CI testing with `npm run test`
* F5 debugging with the `launch.json`
* F5 debugging the tests with the `launch.json`

**The approach has me compiling both with webpack and `tsc` for the tests and debugging.**

Here is my project [https://github.com/johnpapa/vscode-peacock](https://github.com/johnpapa/vscode-peacock)

Changed my main file in `package.json`  


```text
  "main": "./dist/extension",
```

My npm scripts in `package.json`  


```text
  "scripts": {
    "package": "npx vsce package",
    "publish": "npx vsce publish",

    "vscode:prepublish": "webpack --mode production",
    "compile": "webpack --mode none",
    "watch": "webpack --mode none --watch",

    "postinstall": "node node_modules/vscode/bin/install",
    "just-test": "node node_modules/vscode/bin/test",
    "test-compile": "tsc -p ./ && npm run compile",
    "test": "npm run test-compile && node node_modules/vscode/bin/test"
  },
```

My `launch.json` configurations for debugging the runtime and tests:  


```text
  "configurations": [
    {
      "name": "Run Extension",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": ["--extensionDevelopmentPath=${workspaceFolder}"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "preLaunchTask": "npm: test-compile"
    },
    {
      "name": "Extension Tests",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "${workspaceFolder}/testworkspace",
        "--disable-extensions",
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"],
      "preLaunchTask": "npm: test-compile"
    }
  ]
```

And here is the entire repo where you can see everything in context 👇

### ![GitHub logo](https://res.cloudinary.com/practicaldev/image/fetch/s--vJ70wriM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/github-logo-ba8488d21cd8ee1fee097b8410db9deaa41d0ca30b004c0c63de0a479114156f.svg) [johnpapa ](https://github.com/johnpapa)/ [vscode-peacock](https://github.com/johnpapa/vscode-peacock)

#### Subtly change the color of your Visual Studio Code workspace. Ideal when you have multiple VS Code instances, use VS Live Share, or use VS Code's Remote features, and you want to quickly identify your editor.

## Peacock for Visual Studio Code

[![Peacock Icon](https://res.cloudinary.com/practicaldev/image/fetch/s--e5y9gHr6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://raw.githubusercontent.com/johnpapa/vscode-peacock/master/resources/peacock-icon-small.png)](https://raw.githubusercontent.com/johnpapa/vscode-peacock/master/resources/peacock-icon-small.png)

Subtly change the color of your Visual Studio Code workspace. Ideal when you have multiple VS Code instances, use VS Live Share, or use VS Code's Remote features, and you want to quickly identify your editor.

Read the extensive [documentation here](https://www.peacockcode.dev/) which includes a guide on how to use Peacock and a [changelog](https://papapeacockstorage.z13.web.core.windows.net/changelog/)

[![Badge for version for Visual Studio Code extension johnpapa.vscode-peacock](https://camo.githubusercontent.com/eaabd23f944ce2b45e4d2817554773c3e1a52d60/68747470733a2f2f76736d61726b6574706c61636562616467652e61707068622e636f6d2f76657273696f6e2f6a6f686e706170612e7673636f64652d706561636f636b2e7376673f636f6c6f723d626c7565267374796c653d3f7374796c653d666f722d7468652d6261646765266c6f676f3d76697375616c2d73747564696f2d636f6465)](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock&wt.mc_id=vscodepeacock-github-jopapa) [![Installs](https://camo.githubusercontent.com/2f7afb9696f9dea222c4ece19b394c427d013b43/68747470733a2f2f76736d61726b6574706c61636562616467652e61707068622e636f6d2f696e7374616c6c732d73686f72742f6a6f686e706170612e7673636f64652d706561636f636b2e7376673f636f6c6f723d626c7565267374796c653d666c61742d737175617265)](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock&wt.mc_id=vscodepeacock-github-jopapa) [![Downloads](https://camo.githubusercontent.com/dc7f01ace0f8493e76e6e1c3a22ecb0aec405b2b/68747470733a2f2f76736d61726b6574706c61636562616467652e61707068622e636f6d2f646f776e6c6f6164732d73686f72742f6a6f686e706170612e7673636f64652d706561636f636b2e7376673f636f6c6f723d626c7565267374796c653d666c61742d737175617265)](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock&wt.mc_id=vscodepeacock-github-jopapa) [![Rating](https://camo.githubusercontent.com/f2ab44a1d7aaa94ce7efc649f764508f23e02e99/68747470733a2f2f76736d61726b6574706c61636562616467652e61707068622e636f6d2f726174696e672f6a6f686e706170612e7673636f64652d706561636f636b2e7376673f636f6c6f723d626c7565267374796c653d666c61742d737175617265)](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock&wt.mc_id=vscodepeacock-github-jopapa) [![Live Share](https://camo.githubusercontent.com/e17ec18e51a5b8b8b7616290b55fc1edd9338335/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6976655f53686172652d656e61626c65642d3846383043462e7376673f636f6c6f723d626c7565267374796c653d666c61742d737175617265266c6f676f3d76697375616c2d73747564696f2d636f6465)](https://visualstudio.microsoft.com/services/live-share/?wt.mc_id=vscodepeacock-github-jopapa)

[![The MIT License](https://camo.githubusercontent.com/667f40e2dd058ce2bcf4f70207e9e2b3a6980fca/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d6f72616e67652e7376673f636f6c6f723d626c7565267374796c653d666c61742d737175617265)](http://opensource.org/licenses/MIT) [![All Contributors](https://camo.githubusercontent.com/c3004f632eea3e1233f3a3b8714f01eb3a43987c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f616c6c5f636f6e7472696275746f72732d31352d626c75652e7376673f7374796c653d666c61742d737175617265)](https://raw.githubusercontent.com/johnpapa/vscode-peacock/master/#contributors)

[![Build Status](https://camo.githubusercontent.com/eddccca048ecd01e539d55bc2fe97ad9b164827f/68747470733a2f2f6a6f686e706170612e76697375616c73747564696f2e636f6d2f7673636f64652d706561636f636b2f5f617069732f6275696c642f7374617475732f5653253230436f6465253230506561636f636b253230457874656e73696f6e3f6272616e63684e616d653d6d6173746572)](https://johnpapa.visualstudio.com/vscode-peacock/_build/latest?definitionId=3&branchName=master) [![Greenkeeper badge](https://camo.githubusercontent.com/515eb92a47fd13af19a043c514e56664a12e5e26/68747470733a2f2f6261646765732e677265656e6b65657065722e696f2f6a6f686e706170612f7673636f64652d706561636f636b2e737667)](https://greenkeeper.io/)

### Install

1. Open **Extensions** sideBar panel in Visual Studio Code and choose the menu options for **View → Extensions**
2. Search for `Peacock`
3. Click **Install**
4. Click **Reload**, if required

### Documentation

Read the extensive [documentation here](https://www.peacockcode.dev/) which includes a guide on how to use Peacock and a [changelog](https://papapeacockstorage.z13.web.core.windows.net/changelog/)

### Quick Usage

Let's see Peacock in action!

1. Create/Open a VSCode Workspace \([Peacock only works in a Workspace](https://papapeacockstorage.z13.web.core.windows.net/guide/#peacock-commands-are-not-appearing)\)
2. Press `F1` to open the command palette
3. Type `Peacock`
4. Choose `Peacock: Change to a favorite color`
5. Choose one of the pre-defined colors and see how it changes…

[View on GitHub](https://github.com/johnpapa/vscode-peacock)

### What Kind of Impact Can it Have?

This is a great question, and one we should definitely ask. I mean, after all, to make any code change there has to be some value. I was able to get permission \(thanks to the VS Code team and Erich Gamma\) to share some performance stats \(unofficial tests\) of two extensions you may have used.

Both of these extensions have a considerable amount of logic in them and do some pretty impressive and useful things.

#### Azure Account

The [Azure Account extension's](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account&wt.mc_id=devto-blog-jopapa) size and number of files decreased considerably ... like from "holy moly" to "not bad"!

The warm activation is a term for how long it takes the extension to activate, when that extension has already been installed previously \(not the first time\). This was cut in half for this extension. Not bad at all!

* Download size \(the .vsix\): 6.2M to 840K.
* Packaged files: 4300 to 11
* Warm activation time: 676ms to 338ms

#### Docker

The [Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker&wt.mc_id=devto-blog-jopapa) had a noticeable warm activation improvements to under 2 seconds. But the key aspect is the cold activation time. Cold activation is how long it might take the extension to activate when it was just installed.

* Warm activation time: 3.5s to &lt;2s
* Cold activation time \(after 1st install\): 20s to 2s

### Tips

Several things are affected by using webpack to bundle an extension. This is why it's super important to test all of these out.

* Run the extension locally in your debugger \(and test you can hit a breakpoint\)
* Package the extension and load it \(load from VSIX\) from the menu
* Run your tests with your debugger \(and test you can hit a breakpoint\)
* Run your test script from `npm test`

When you are done, you can check the activation time again.







## How to Make Visual Studio Code 150% Faster in Large Projects

I recently switched projects over to our large monorepo \(the zip from GitHub is around 150mb, without `node_modules`\). I found that not only was Webpack causing my fans to run on overdrive, Visual Studio Code would get so laggy that typing caused seconds of latency.

I tried switching back to a simpler code editor, but I'm extremely reliant on Code's built-in search features in such a big project like this.

So, I had to take some time to get to the bottom of this.

Firstly, I checked Activity Monitor. I saw that something called `Code Helper (Renderer)` was taking 150% of my CPU.

My initial assumption was to stop using Code's built-in terminal and switch over to iTerm. That didn't fix it.

I looked at [a lot of GitHub Issues about this issue](https://github.com/microsoft/vscode/issues/87509) and saw repeated comments from the Code team that `Code Helper (Renderer)` is process that comes from an extension. Disable all extensions and it will work.

So... I did. It did not work. I didn't even have any themes installed.

Finally, I came across [an unanswered StackOverflow question](https://stackoverflow.com/questions/54798028/how-do-i-figure-out-which-extension-or-service-is-making-a-vs-code-helper-proces) where the comments answered what I needed.

**If you are having performance issues with Visual Studio Code, open `Developer: Open Process Explorer`.**

I saw that something called `electron_node tsserver.js` was taking up over 100% of my CPU. What was this? I didn't use any TypeScript in my project.

Further looking around led me to the fact that **Visual Studio Code has extensions built-in that you never installed.** I did not know this! You can find these by searching `@builtin` in your extensions.

Specifically, there is an extension called `TypeScript and JavaScript Language Features` which includes a lot of functionality like closing tags. However, it automatically runs TypeScript type-checking even if you don't have a TypeScript project. \(This begs the question, why is Visual Studio Code so deeply integrated with TypeScript that it automatically assumes you're using it? Microsoft is selling us its entire ecoystem.\)

Once I disabled the `TypeScript: Disable Automatic Type Acquisition` feature, Visual Studio Code was instantly faster than I've ever seen it before.

**TL;DR: To make Visual Studio Code extremely fast if you don't use TypeScript, add this line to your settings.json file:**  


```text
{
  "typescript.disableAutomaticTypeAcquisition": true
}
```







Visual Studio Code was released on November 18, 2015. Fast-forward five years, and it has become one of the most successful editors around. It is released under the MIT license, which makes it free to use. Its keys to success are:

* Versatility
* A large number of plugins
* Availability on multiple platforms

Currently, VS Code is available natively on the following platforms:

* OS X Yosemite \(10.10+\)
* Windows 7 \(with .NET Framework 4.5.2\), 8.0, 8.1 and 10 \(32-bit and 64-bit\)
* Linux \(Debian\): Ubuntu Desktop 16.04, Debian 9
* Linux \(Red Hat\): Red Hat Enterprise Linux 7, CentOS 8, Fedora 24

It can also run in any modern browser with limited features.

Its huge platform availability is because it’s a web application delivered on Electron.

> “Electron \(formerly known as Atom Shell\) is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologies: it combines the Chromium rendering engine and the Node.” — [Wikipedia](https://en.wikipedia.org/wiki/Electron_%28software_framework%29)

The only downside is that Electron can be pretty resource-hungry and less effective than native-based applications. That means it can get slower if you are not careful.

Is your VS Code feeling a bit sluggish? Do you want it to run in a more performant way? Today, we will be looking at five tips that will help you get the most out of it.

## Base Requirements <a id="3830"></a>

Before going into optimization, let’s look at if we comply with the minimum hardware recommended by the Visual Studio Code team. We will need a minimum disk footprint of 200 MB.

Processor and memory recommendations:

* 1.6 GHz or faster processor
* 1 GB of RAM

Check out the [more detailed list](https://code.visualstudio.com/docs/supporting/requirements#_hardware).

## 1. Disable Unused Built-In Features <a id="43a1"></a>

VS Code comes packed with features. However, you might not be interested in some of them. You can therefore disable those to improve the editor's performance.

* `File > Preferences > Settings > Files:Exclude`: Add any pattern of files that you don’t want VS Code to use in your project.
* `File > Preferences > Text Editor > Minimap > Enabled`: Checkbox to disable/enable the minimap.
* `File > Preferences > Text Editor > Suggestions`: Here, you can fine-tune anything related to suggestions.
* `File > Preferences > Text Editor > From on save / Format on paste`: You can disable formatting on saving and defer that to pre-commit, for example.
* `File > Preferences > Application > Telemetry`: Telemetry might impact performance.
* `File > Preferences > Text Editor > Code lens`: You can disable/enable the Code Lens feature.

## 2. Be an Extension Minimalist <a id="eb4c"></a>

There are a ton of extensions available. However, that doesn’t mean you need them all. Only add the ones that have a direct impact on your daily productive life.

Before adding any extension, ask yourself:

* Isn’t that already built into VS Code?
* Is it more than a one-off thing?
* Does it really have an impact on your daily work?
* Is this the best tool for your use case?
* Does it have a good rating?

If the plugin does check all the boxes, then it might be a good fit for you. You can do that process with your already installed extensions too.

## 3. Bind Extension to Workspaces <a id="a3e2"></a>

If you are working on many different projects with different code stacks, you might find yourself installing a lot of extensions. That can easily have an impact on performance.

One trick is to couple your extensions with your workspace. That way, you know you are only loading the plugins necessary for that workspace.

What you need to do is just go through all the plugins you have available and disable the ones that you don’t need for your particular workspace.Example of disabling a plugin for a workspace

![Example of disabling a plugin for a workspace](https://miro.medium.com/max/1400/1*9cpVvHAEdBp6o-50QvbYJg.png)

It might look like a time-consuming task at the beginning but it pays off in the long run.

## 4. Monitor the Loading Times of Your Plugins <a id="3e90"></a>

Once you have the bare minimum of plugins needed for your coding, you can check their performance. VS Code comes with some Developer options that you can take advantage of.

You can easily monitor the startup time of all those plugins by executing `cmd + p > Developer: Show Running Extensions`.Example of running extensions command

![Example of running extensions command](https://miro.medium.com/max/1400/1*c7KLQPzgGVqhoMLQc0D_iQ.png)

You will get a list of all your active extensions and their activation time. As a general rule of thumb, you might want to double-check anything that takes more than 300 ms.![Example of running extensions command](https://miro.medium.com/max/60/1*RaJuu10J5xeuwvNBMCr04w.png?q=20)Example of running extensions command

![Example of running extensions command](https://miro.medium.com/max/630/1*RaJuu10J5xeuwvNBMCr04w.png)

If you want to dig deeper, you can profile any of them by hitting the record button.![Profiling an extension](https://miro.medium.com/max/60/1*B8mnzG_zqkU3DClcixrr6w.png?q=20)Profiling an extension

![Profiling an extension](https://miro.medium.com/max/630/1*B8mnzG_zqkU3DClcixrr6w.png)

If you want to get a clear picture of all that’s happening on the VS Code launch, you might want to check the `cmd + p > Developer Startup Performance`.![Example of startup performance command](https://miro.medium.com/max/60/1*6yYgneGRJt_lsxI43rVYJQ.png?q=20)Example of startup performance command

![Example of startup performance command](https://miro.medium.com/max/630/1*6yYgneGRJt_lsxI43rVYJQ.png)

You will get the following information:

* OS details
* Performance metrics
* Extension Activation details
* Cache location

![Sample run of startup performance command](https://miro.medium.com/max/60/1*LTRzC6WAyNPjLd0YhC84pQ.png?q=20)A sample run of startup performance command

![Sample run of startup performance command](https://miro.medium.com/max/630/1*LTRzC6WAyNPjLd0YhC84pQ.png)

It gives a great overview of your VS Code performance. It is useful when trying to assert the impact of any changes on performance. Doing periodic checks is a good habit to make sure everything is running smoothly.

## **5. Fine-Tune Your Configure Runtime Arguments** <a id="91aa"></a>

There might be situations where you have to further configure the startup of VS Code. You can do that by using arguments in the command line. It is easy to configure that on the `argv.json` file.

Run `CMD + Shift + P > Configure Runtime Arguments`.Configuring the runtime arguments

![Configuring the runtime arguments](https://miro.medium.com/max/1400/1*1DhK8OY15J-q4Y1HCjdFKA.png)

Then edit the `argv.json` file with all your custom configurations.![File for configuring the runtime arguments](https://miro.medium.com/max/630/1*Y1vW__ae6zUIbi2fl5VHaA.png)File for configuring the runtime arguments

![File for configuring the runtime arguments](https://miro.medium.com/max/60/1*Y1vW__ae6zUIbi2fl5VHaA.png?q=20)

## Final Thoughts <a id="320a"></a>

VS Code is a great widely used IDE. It is very flexible and highly customizable. However, this comes with a cost. Make sure you understand what you are adding and how you are loading it.

At first, it seems like it’s easier to add plugins for any minor task you find yourself doing. With time, that extension starts to fade away in search of a more performant editor.

I hope all these tips help you speed up your VS Code editor and enjoy a better coding experience.

