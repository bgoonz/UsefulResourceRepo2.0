Pixarea theme system - by Daniel Reszka (blog.pixarea.com)
==========================================================

This is a personal CSS framework I'm building for my future projects, based on SASS and Compass.

My intention with this framework, is to be able to design websites directly in the browser, thus skipping Photoshop.

So, this theme system:

* Aims for extreme modularity thanks to the mixins, so everything can be re-used across projects. 
* Takes advantage of CSS3 features: box-shadows, gradients, rounded-corners, to design websites in the browser.
* Uses javascript (PIE.js from css3pie.com) so most of these CSS3 effects will work immediately in IE.

It's very experimental for now, you can use it freely, but you have to know:
It is not complete, it is not well-documented, it is not well-tested, and it may not be ready to use for your projects.
Remember that everything here can be modified, broken, refactored at any time.

But if you like the approach, feel free to clone, play with it and share ideas.

Install as a gem
----------------

    gem install pixarea-compass-themes

Generate a theme
----------------
This project is a Compass plugin.
So you have to install Compass first, then you can create your new project with:

    compass create MY_THEME -r pixarea-compass-themes -u pixarea-compass-themes --syntax sass

Where MY_THEME is the name of your project.

Note: Don't use "--syntax sass" if you prefer the scss syntax.

To remove Compass line comments
-------------------------------
Add this to the file config.rb:

    line_comments = false
