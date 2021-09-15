# Roots Collections

Content Collections based on  Markdown with Frontmatter for the [Roots](http://roots.cx/) static site generator.

## Installation

*  make sure you're in your roots project directory
*  `npm install roots-collections --save`
*  modify your `app.coffee` file to include the extension

   ```coffee
   collections = require 'roots-collections'

   module.exports =
     extensions: [collections(folder: 'posts', layout: 'post')]
   ```

## Usage

Once you've installed the extension, Roots will search the specified folder for collections and make them available in your templates.

Files in the folder should end with the extension `.md` and be written as markdown with YAML frontmatter:

```
---
title: This is the title
desc: A description
---

# I am markdown

Hello
```

If the file names follow the following patter:

```
/posts/2015-05-04-this-is-a-blog-post.md
```

The extension will automatically add a `date` to the entries based on the date in the filename.

If a `layout` is specified, each entry will be rendered with the specified layout. The layout template can access an `entry` variable with the title, date, slug, body, and other metadata from the entry.

```jade
extends layout

block content  
  h3.post-title= entry.title
  .post-body!= entry.body
```

## Entry Listings

The name of the collection is based on the folder, unless you explicitly set a `name` when configuring the extension.

So if you configure the extension with `posts(folder: 'posts')` you will be able to use `posts.orderBy('date','desc')` in templates. If you configure the extension with `posts(folder: 'docs')`, you'll be able to use `docs.orderBy('title')` in templates.

Example:

```jade
.recent-posts-listing
  each post in posts.orderBy('date', 'desc').slice(0, 10)
    h3.title
      a.post-title(href=post.permalink)= post.title
    .body!= post.body
```

## Computed Entry Properties

By default the collections extension will compute the `slug`, `permalink`,`date` and `body` properties based on the filename of each entry, but you can also hook into the compilation phase to add your own computed properties or modify any of the default properties, by passing a `prepare` function to the extension:

Here's a simple example of adding an `upcased_title` property to each entry.

```coffee
module.exports =
  extensions: [collections(
    folder: 'posts',
    layout: 'post',
    prepare: (post) ->
      post.upcased_title = post.title && post.title.toUpperCase()
  )]
```

## License

This extension is published under the [MIT License](https://github.com/netlify/roots-collections/blob/master/LICENSE.md)
