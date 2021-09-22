path         = require 'path'
yaml         = require 'js-yaml'
marked       = require 'marked'
_            = require 'lodash'
w            = require 'when'
nodefn       = require 'when/node/function'
fs           = require 'fs'

decorateArray = (array) ->
  array.byDate = -> decorateArray(array.sort((a,b) -> b.date - a.date))
  array.byTitle = -> decorateArray(array.sort((a,b) -> a.title - b.title))
  array

module.exports = (options) ->
  options ||= {}
  folder = options.folder || "posts"
  helperName = options.name || folder

  class PostExtension
    constructor: (@roots) ->
      @category = "post_#{options.folder}"
      @posts = []
      @roots.config.locals[helperName] = decorateArray([])

    frontmatter_regexp: /^---\n([^]*?)\n---\n([^]*)$/

    fs: ->
      extract: true
      ordered: true
      detect: (f) ->
        if "views/#{options.layout}.jade" == f.relative
          true
        else
          path.dirname(f.relative) == folder

    compile_hooks: ->
      extension = @

      before_pass: (ctx) ->
        f = ctx.file
        if f.file.relative == "views/#{options.layout}.jade"
          f.originalContent = f.content
          extension.layoutFile = f
        else
          posts = extension.roots.config.locals[helperName]
          posts.push(extension.read_file(f))

      write: (ctx) ->
        false

    category_hooks: ->
      after: @after_category.bind(@)

    read_file: (f) ->
      match = f.content.match(@frontmatter_regexp);

      obj = if match then yaml.safeLoad(match[1]) else {}
      obj.body = if match then (match[2] || "").replace(/^\n+/, '') else content
      obj.body = marked(obj.body)

      name = path.basename(f.file_options.filename)
      parts = name.split("-")
      date = new Date("#{parts[0]}-#{parts[1]}-#{parts[2]}")
      obj.date = date
      obj.permalink = f.file_options._path

      obj.file_options = f.file_options
      obj.file = f
      f.file_options.post = obj

      @posts.push(obj)
      obj

    configure_options: (file, adapter) ->
      global_options  = @roots.config.locals ? {}
      adapter_options = @roots.config[adapter.name] ? {}
      file_options    = file.file_options
      compile_options = file.compile_options

      _.extend(global_options, adapter_options, file_options, compile_options)

    after_category: (ctx, category) ->
      return unless category == @category

      adapter = @layoutFile.adapters[0]
      content = @layoutFile.originalContent
      opts = @configure_options(@layoutFile, adapter)

      results = []
      for post in @posts
        do (post) ->
          adapter.render(content, _.extend(opts, {post: post})).then (result) ->
            output = path.join(ctx.roots.config.output_path(), post.file_options._path)
            results.push(nodefn.call(fs.writeFile, output, result.result))
      w.all(results)
