## Features

This has the core components of [verb] and [assemble], and [generate]. You can use it to build your own application too. It comes with a fully-functional CLI and API for running tasks, plugins, routes and middleware, including the following:

- **tasks/plugins**: gulp-style tasks and support for vinyl plugins (gulp, verb, assemble). Session caching is also used to allow context to be passed from one task to another.
- **engines**: ability to render templates from any template engine.
- **middleware**: for priming the `file` object with default properties, like `data`
- **routes**: for running the default middleware at specific points in the plugin pipeline

The goal with this project is to generalize the core functionality used a