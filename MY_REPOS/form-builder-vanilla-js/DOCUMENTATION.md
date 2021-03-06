# Bootstrap v 3.0.0 Form Builder

## What's this?

A Drag-and-drop form builder for [twitter bootstrap](http://getbootstrap.com/).

## Where can I see it in action using bootstrap v 2.3.1 thanks to [minikomi](https://github.com/minikomi/Bootstrap-Form-Builder/)?

And It's hosted on github pages [here](http://ihabsoliman.github.io/Bootstrap-Form-Builder) using bootstrap v 3.0.0

### Notes

- For development & debugging change the data-main for the require script tag in `index.html`
  to point at `assets/js/main.js`. (Look just before the closing `<body>` tag!)

- Once done, change it back to build for production using the `build.js` script in the `assets/js/lib`
  folder and [r.js](https://github.com/jrburke/r.js/). Then revert to `assets/js/main-built.js`

- The full command is `r.js -o assets/js/lib/build.js` which should be run from the base directory.

### Adding new form elements

- In the [js/data/yaml folder](https://github.com/minikomi/Bootstrap-Form-Builder/tree/gh-pages/assets/js/data/yaml) are yaml files, each of which corresponds to a tab in the form builder.
- If you just want to add a new element you need to:
  - describe it in one of these files
  - parse the yaml to json using parse.rb in the same folder
  - create a corresponding template in the [templates/snippet directory](https://github.com/minikomi/Bootstrap-Form-Builder/tree/gh-pages/assets/js/templates/snippet)
  - add the template to [snippet-templates.js](https://github.com/minikomi/Bootstrap-Form-Builder/blob/gh-pages/assets/js/templates/snippet/snippet-templates.js)
- If you want to add a new tab, you'll also need to adjust the [app.js file](https://github.com/minikomi/Bootstrap-Form-Builder/blob/gh-pages/assets/js/app.js) to make sure the tab is loaded.
