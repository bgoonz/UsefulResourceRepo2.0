export const helpTexts = {
  usage: `
jekyll 3.1.2 -- Jekyll is a blog-aware, static site generator in Ruby

Usage:

  jekyll <subcommand> [options]

Options:
        -s, --source [DIR]  Source directory (defaults to ./)
        -d, --destination [DIR]  Destination directory (defaults to ./_site)
            --safe         Safe mode (defaults to false)
        -p, --plugins PLUGINS_DIR1[,PLUGINS_DIR2[,...]]  Plugins directory (defaults to ./_plugins)
            --layouts DIR  Layouts directory (defaults to ./_layouts)
            --profile      Generate a Liquid rendering profile
        -h, --help         Show this message
        -v, --version      Print the name and version
        -t, --trace        Show the full backtrace when an error occurs

Subcommands:
  docs
  import
  build, b              Build your site
  clean                 Clean the site (removes site output and metadata file) without building.
  doctor, hyde          Search site and print specific deprecation warnings
  help                  Show the help message, optionally for a given subcommand.
  new                   Creates a new Jekyll site scaffold in PATH
  serve, server, s      Serve your site locally
`,

  wrongFolder: `
__For this demo you should be in the jekyll-site folder to use the jekyll command__
__Use **ls** and **cd** to navigate__

`,
  buildWithJekyll: `
__Jekyll is a ruby based static site generator. It comes with a lot of commands__
__The only one we'll use in this tutorial is **jekyll build**__

`,
  wontServe: `
__Yeah - running a jekyll webserver in a simulated terminal in your browser would be cool, right?__
__Also kinda time consuming and not super usefull.__

__How about running **jekyll build**?__

`
};
