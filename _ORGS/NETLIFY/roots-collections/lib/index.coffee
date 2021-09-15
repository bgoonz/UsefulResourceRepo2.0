path         = require 'path'
yaml         = require 'js-yaml'
marked       = require 'marked'
_            = require 'lodash'
w            = require 'when'
nodefn       = require 'when/node/function'
fs           = require 'fs'

decorateArray = (array) ->
  array.orderBy = (property, direction) ->
    decorateArray(
      array.sort (a,b) ->
        [a,b] = [b,a] if direction == 'desc'
        [propA, propB] = [a[property], b[property]]
        propA - propB
    )
  array

# The first time a layout is found it'll be marked as part of the category
# Keep a cache of layoutFiles to make sure it can be used by other collections as well
layoutFiles = {}

module.exports = (options) ->
  options ||= {}
  folder = options.folder || "posts"
  helperName = options.name || folder

  class CollectionExtension
    constructor: (@roots) ->
      @category = "collection_#{options.folder}"
      @entries = []
      @roots.config.locals ||= {}
      @roots.config.locals[helperName] = decorateArray([])
      @layoutFilename = path.join("views", "#{options.layout}.jade")
      console.log("Layout: ", @layoutFilename)

    frontmatter_regexp: /^---\n([^]*?)\n---\n([^]*)$/m
    slug_date_regexp: /^([0-9]{4})-(\d\d?)-(\d\d?)-/

    fs: ->
      extension = @
      extract: true
      ordered: true
      detect: (f) ->
        if f.relative == extension.layoutFilename
          true
        else
          path.dirname(f.relative) == folder

    compile_hooks: ->
      extension = @

      before_file: (ctx) ->
        f = ctx.file
        if f && f.relative == extension.layoutFilename
          ctx.originalAdapter = ctx.adapters[0]
          ctx.originalContent = ctx.content
          ctx.adapters = []
          layoutFiles[extension.layoutFilename] = extension.layoutFile = ctx

      before_pass: (ctx) ->
        entries = extension.roots.config.locals[helperName]
        entries.push(extension.read_file(ctx.file))

      write: (ctx) ->
        false

    category_hooks: ->
      after: @after_category.bind(@)

    read_file: (f) ->
      match = f.content.match(@frontmatter_regexp);

      obj = if match then yaml.safeLoad(match[1]) else {}
      obj.body = if match then (match[2] || "").replace(/^\n+/, '') else f.content
      obj.body = marked(obj.body)

      obj.path = path.basename(f.file_options.filename)
      obj.slug = obj.path.replace(/\..+?$/, '')
      match = obj.slug.match(@slug_date_regexp)
      if match
        obj.date = new Date("#{match[1]}-#{match[2]}-#{match[3]}")
      obj.permalink = f.file_options._path

      obj.file_options = f.file_options
      obj.file = f
      options.prepare(obj) if options.prepare

      f.file_options.entry = obj

      @entries.push(obj)
      obj

    configure_options: (file, adapter) ->
      global_options  = @roots.config.locals ? {}
      adapter_options = @roots.config[adapter.name] ? {}
      file_options    = file.file_options
      compile_options = file.compile_options

      _.extend(global_options, adapter_options, file_options, compile_options)

    after_category: (ctx, category) ->
      return unless category == @category

      @layoutFile ||= layoutFiles[@layoutFilename]
      throw("No layout #{@layoutFilename} found for #{category}") unless @layoutFile

      adapter = @layoutFile.originalAdapter
      content = @layoutFile.originalContent
      opts = @configure_options(@layoutFile, adapter)

      results = []
      for entry in @entries
        do (entry) ->
          adapter.render(content, _.extend(opts, {entry: entry})).then (result) ->
            output = path.join(ctx.roots.config.output_path(), entry.permalink)
            results.push(nodefn.call(fs.writeFile, output, result.result))
      w.all(results)
