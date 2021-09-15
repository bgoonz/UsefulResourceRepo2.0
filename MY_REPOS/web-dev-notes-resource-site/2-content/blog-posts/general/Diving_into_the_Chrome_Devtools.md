# Diving into the Chrome Devtools

> I’ve wanted to learn more about the Chrome Devtools for a while and got the opportunity to spend a whole day in a workshop yesterday, so I…

[![Charlie Gerard](https://miro.medium.com/fit/c/56/56/0*Ojn5MLHwh6HFuAnj.jpeg)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@devdevcharlie?source=post_page-----7a16cfdb56d2--------------------------------)

The Chrome Devtools are very powerful and I’ve wanted to learn more about them for a while. Yesterday, I got the opportunity to dive a bit into them during a full day workshop, so I decided to share what I’ve learnt so far in case it can benefit others. Of course, what follows is only a subset of all the features available so this post might be the first in a series!

The **command palette** gives you access to pretty much all features of the devtools from a single command.

To activate it, use **Command + Shift + P**.

![Image for post](https://miro.medium.com/freeze/max/60/1*AGS1OiwGLaYiL72H3CL9xA.gif?q=20)

![Image for post](https://miro.medium.com/max/3840/1*AGS1OiwGLaYiL72H3CL9xA.gif)

Using the Command panel in Chrome DevTools

From there, you can quickly navigate to different panes or drawers in the devtools, switch to dark theme, change the position of the devtools, clear site data, etc..!

If you remove the `>` and replace it with `?`, you will see how to access other commands.

For example, you can navigate to a specific line in a file by writing `:` followed by the line number you want to navigate to.

![Image for post](https://miro.medium.com/freeze/max/60/1*49KH5AyrrBATw_on6Y8m7g.gif?q=20)

![Image for post](https://miro.medium.com/max/3840/1*49KH5AyrrBATw_on6Y8m7g.gif)

Navigating to files and lines

Useful examples:

`>screenshots` to take different kind of screenshots

`>resources` to clear site data

`>appearance` to switch to dark mode

The sources panel allows you to view, edit and debug files. There are 5 different panes available:

*   Page: All the resources the page has loaded. You can edit the CSS without having to save the file, however changes to JavaScript files have to be done via the Filesystem or Overrides pane.
*   Filesystem: For local development. You can use the Chrome devtools to edit files from your application and see your changes.
*   Overrides: For production sites, you can use the devtools to edit files from live sites and see your changes.
*   Content scripts: See sources from extensions.
*   Snippets: You can write snippets of code to run on websites.

Changes to JavaScript files:
----------------------------

**Filesystem**

When developing locally, changes to JS files can be done in the Filesystem pane. To do this, follow these steps:

*   Add your project folder to the Filesystem pane and you should see a green dot next to the files indicating you can make local changes.
*   Make a small change to a file.
*   Save.
*   Reload

You should be able to see your changes after reload and use the devtools as an editor.

![Image for post](https://miro.medium.com/freeze/max/60/1*MhdK56xSQgSVedsdeE-nvw.gif?q=20)

![Image for post](https://miro.medium.com/max/2400/1*MhdK56xSQgSVedsdeE-nvw.gif)

Making local changes using the filesystem panel

**Overrides**

You can also makes changes to JS files on production websites by using the Overrides pane.

To do this:

*   Create a folder on your computer to save the overrides.
*   Open the `Overrides` pane in Chrome and select this folder.
*   Navigate to the `Page` pane, right-click on the file you’d like to edit and select _save for overrides_. You should see a purple dot next to the added files.
*   Navigate back to the `Overrides` pane, edit the file, save and reload.

You should now be able to see your changes on the live site.

![Image for post](https://miro.medium.com/freeze/max/60/1*IxlIhJUOqHD1GevhlIdp6Q.gif?q=20)

![Image for post](https://miro.medium.com/max/2560/1*IxlIhJUOqHD1GevhlIdp6Q.gif)

Making changes to production websites using Overrides

**Changes to files in Overrides only work while the devtools are open.**

You can right-click on the files and select delete to remove overrides.

Snippets
--------

Snippets are pieces of code you can run on any website.

They have to be IIFE (Immediately Invoked Function Expressions), can’t take arguments or be loaded on page load (they have to be run manually).

To create a snippet:

*   Go to the `Snippets` pane
*   Click on `New snippet`
*   Write some code
*   Save
*   Right click and run.

You can also run a snippet at any time from the command palette by running `!NAME_OF_SNIPPET`.

![Image for post](https://miro.medium.com/max/2560/1*hZuHig0KCa-b259HFD0Bqw.gif)

Creating a snippet

If you don’t want to write your own or need some inspiration, check out this [repo for some Chrome code snippets](https://github.com/bahmutov/code-snippets).

You can quickly access the performance pane via the command palette by typing `>performance` .

Performance drawers
-------------------

**Rendering**

Besides having access to the performance monitor, you can also access the **rendering drawer** with extra options via the command palette by typing `>rendering` . In this drawer, you can check the FPS, what gets repainted, etc…

**Coverage**

You can also access how much of your code is actually used on a page by using the `>coverage` drawer. It will show you all CSS and JS files loaded on the page, sorted by unused bytes.

You can then click on one of the resources to go to the file where the used code is highlighted in green, and the unused code, in red.

This allows you to see what pieces of code are good candidates for **code splitting**.

![Image for post](https://miro.medium.com/max/2560/1*uXG-uf9nHrYKW15D5Er2FQ.gif)

Code coverage

**Monitor**

The monitor allows you to track metrics such as CPU usage, JS event listeners, number of layouts recalcs and style recalcs / sec…

To see which CSS properties trigger layout or style recalcs, check out this resource: [csstriggers.com](https://csstriggers.com/).

**Layers**

This pane shows how your page is rendered with layers heights in 3D.

![Image for post](https://miro.medium.com/max/3800/1*TkoCzPYLJYG9eX5YaSYvCg.gif)

Layers panel

That’s all I have the time to share for now! Hope it helps!


[Source](https://medium.com/@devdevcharlie/diving-into-the-chrome-devtools-7a16cfdb56d2)