# Simple Tree jQuery

Yet another jQuery treeview plugin to display nested ULs as nice trees.

This plugin is based on a script and CSS for simple unobtrusive javascript treeview developed by Krijn Hoetmer:

http://krijnhoetmer.nl/stuff/javascript/list-treeview-menu/

Adapted as a jQuery plugin by Maurizio Manetti.

Live demo and examples: https://mauntrelio.github.io/demos/simpletree/

## Installation:

To be done.

## Usage:

Include files from the dist folder:

    <!-- Simple Tree core CSS file -->
    <link rel="stylesheet" href="css/simpletree.css">

    <!-- jQuery 1.9+ or Zepto.js 1.0+ -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <!-- Simple Tree core JS file -->
    <script src="js/jquery.simpletree.js"></script>

Treeview initialization should be executed after document ready, for example:

    $(document).ready(function() {
      $('.tree').simpleTree({startCollapsed: false});
    });

The option `startCollapsed` is true by default.

Treeview can be applied programmatically:

    $('#maketree').on('click',function(){
    	$('#firstTree').simpleTree();
    });

Treeview can be removed:

    $('#destroytree').on('click',function(){
    	$('#firstTree').simpleTree('destroy');
    });

Please note that simpleTree is stateful: expanded and collapsed status of the nodes will be kept if you destroy and then re-apply treeview again. This is based on simpleTree specific classes (`.st-open` and `.st-collapsed`) defined in the CSS.

This is also useful if you want to have a treeview partially opened by default: just give the class `.st-open` or `.st-collapsed` to the relevant List Item. Class given on the single LI element take precedence over the global startCollapsed option.

Treeview provides three basic methods in addition to `destroy`.
Use the `expand` method to fully open a treeview:

    $('#firstTree').simpleTree('expand');

Use the `collapse` method to completely close a treeview:

    $('#firstTree').simpleTree('collapse');

If you need to dynamically add or remove elements to your list when the treeview is applied and you want to keep consistency, just call the `repaint` method immediately after adding or removing the element:

    $('#firstTree').append('<li>Added item</li>');
    $('#firstTree').simpleTree('repaint');

Live demo and examples: https://mauntrelio.github.io/demos/simpletree/

## Alternatives:

There are plenties

- https://plugins.jquery.com/?s=treeview
- https://github.com/caerphoto/simpletreeview
- https://github.com/mar10/fancytree
- http://mbraak.github.io/jqTree/
- https://github.com/phoenixinobi/simpletree
- https://github.com/innoq/simpletree

## TODO:

- installation
- minified version
- themes (different icons / look)
