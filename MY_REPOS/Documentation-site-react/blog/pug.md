---
slug: Data structures
title: Data Structures
author: Bryan Guner
author_title: Web Developer
author_url: https://github.com/bgoonz
author_image_url: https://avatars.githubusercontent.com/u/66654881?s=460&u=4614c45125eb6ab7e4b04468cb9cdf5c998c879d&v=4
tags: [Data Structures, Algorithms]
---

#### Jump to... {#jump-to .mume-header}

-   [Syntax](#syntax)
-   [Rendering](#render)
-   [Method options](#options)
-   [Inheritance](#inheritance)
-   [Interpolation](#interpolation)
-   [Iteration](#iteration)

Pug {#pug .mume-header}
===

-   Pug (formerly known as Jade) is a preprocessor which simplifies the
    task of writing HTML. It also adds a ton of functionality, such as
    Javascript objects, conditionals, loops, mixins and templates.
-   Pug fully integrates with Express, a popular Node.js web framework,
    as a supported view engine.

#### Installation {#installation .mume-header}

-   Pug is available via npm:\
     `npm install - g pug-cli`{.language-javascript}

#### Pug Syntax []() {#pug-syntax-a-idsyntaxa .mume-header}

-   **whitespace sensitive**: Pug uses indentation to work out with tags
    are nested inside each other.

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    div.remark
      p Pug rocks!!
    ```

    The code above produces this:

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    <div class="remark">
      <p>Pug rocks!!</p>
    </div>
    ```

    -   It doesn't matter what level of indentation you use, as long as
        the **level of indentation remains consistent**
-   **Pug doesn't have any closing tags**
    -   If no tag is specified, Pug will assume a
        `<div>`{.language-javascript} element.

#### Classes, IDs and Attributes {#classes-ids-and-attributes .mume-header}

-   **Classes** are expressed as `.className`{.language-javascript}
-   **IDs** are expressed as `#IDname`{.language-javascript}
-   **Attributes** are added using brackets

#### Plain Text and Text Blocks {#plain-text-and-text-blocks .mume-header}

-   Pug provides various methods for adding plain text directly into the
    rendered HTML.
    -   Add plain text inline:\

        `h1.navbar-header We can write anything we want here …`{.language-javascript}
    -   Prefix a line with a pipe `|`{.language-javascript} character:

        ``` {.language- data-role="codeBlock" data-info=""}
         p
          | You are logged in as
          | user@example.com
        ```

    -   When dealing with large blocks of text, you can just add a dot
        right after the tag name, or after the closing parenthesis, if
        the tag has attributes:

        ``` {.language- data-role="codeBlock" data-info=""}
         p.
          HTML TEXT.....
        ```

#### Comments {#comments .mume-header}

-   Comments in Pug can be escaped similar to Javascript with
    `//`{.language-javascript}

    ``` {.language- data-role="codeBlock" data-info=""}
     //- Invisible comment.
    //Visible comment.
    ```

#### Rendering Proccess of Pug []() {#rendering-proccess-of-pug-a-idrendera .mume-header}

#### `pug.compile(source, options)`{.language-javascript} {#pugcompilesource-options .mume-header}

-   will compile the Pug source code into a JavaScript function that
    takes a data object (called "locals") as an argument.
-   Call that resultant function with your data, and voilà!, it will
    return a string of HTML rendered with your data.
-   The compiled function can be re-used, and called with different sets
    of data.
    -   **source**: `string`{.language-javascript}
        -   The source Pug template to compile
    -   **options**: `?options`{.language-javascript}
        -   An options object
    -   **returns**: `function`{.language-javascript}

        -   A function generate the HTML form an object containing
            locals

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        var pug = require('pug');

        // Compile a function
        var fn = pug.compile('string of pug', options);

        // Render the function
        var html = fn(locals);
        // => '<string>of pug</string>'
        ```

#### `pug.render(source, options, callback)`{.language-javascript} {#pugrendersource-options-callback .mume-header}

-   combines compiling and rendering into one step
-   the template function will be re-compiled every time
    `render`{.language-javascript} is called, which may impact
    performance.
    -   **source**: `string`{.language-javascript}
        -   The source Pug template to render
    -   **options**: `?options`{.language-javascript}
        -   An options object, also used as the locals object
    -   **callback**: `function`{.language-javascript}
        -   Node.js-style callback receiving the rendered results. This
            callback is called synchronously.
    -   **returns**: `string`{.language-javascript}

        -   The resulting HTML string

        ``` {.language-javascript data-role="codeBlock" data-info="js"}
        var pug = require('pug');

        var html = pug.render('string of pug', options);
        // => '<string>of pug</string>'
        ```

#### Options []() {#options-a-idoptionsa .mume-header}

-   All API methods accept the following set of options:

  Option                                           Accepts                                 Action
  ------------------------------------------------ --------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  `filename`{.language-javascript}                 `string`{.language-javascript}          The name of the file being compiled. Used in exceptions, and required for relative `include`{.language-javascript} \\s and `extend`{.language-javascript}\\s. Defaults to `Pug`{.language-javascript}.
  `basedir`{.language-javascript}                  `string`{.language-javascript}          The root directory of all absolute inclusion.
  `doctype`{.language-javascript}                  `string`{.language-javascript}          If the `doctype`{.language-javascript} is not specified as part of the template, you can specify it here. It is sometimes useful to get self-closing tags and remove mirroring of boolean attributes.
  `filters`{.language-javascript}                  `object`{.language-javascript}          Hash table of custom filters. Defaults to `undefined`{.language-javascript}.
  `self`{.language-javascript}                     `boolean`{.language-javascript}         Use a `self`{.language-javascript} namespace to hold the locals. It will speed up the compilation, but instead of writing `variable`{.language-javascript} you will have to write `self.variable`{.language-javascript} to access a property of the locals object. Defaults to `false`{.language-javascript}.
  `debug`{.language-javascript}                    `boolean`{.language-javascript}         If set to `true`{.language-javascript}, the tokens and function body are logged to stdout.
  `compileDebug`{.language-javascript}             `boolean`{.language-javascript}         If set to `true`{.language-javascript}, the function source will be included in the compiled template for better error messages (sometimes useful in development). It is enabled by default, unless used with Express in production mode.
  `globals`{.language-javascript}                  `Array<string>`{.language-javascript}   Add a list of global names to make accessible in templates.
  `cache`{.language-javascript}                    `boolean`{.language-javascript}         If set to `true`{.language-javascript}, compiled functions are cached. `filename`{.language-javascript} must be set as the cache key. Only applies to `render`{.language-javascript} functions. Defaults to `false`{.language-javascript}.
  `inlineRuntimeFunctions`{.language-javascript}   `boolean`{.language-javascript}         Inline runtime functions instead of `require`{.language-javascript}-ing them from a shared version. For `compileClient`{.language-javascript} functions, the default is `true`{.language-javascript} (so that one does not have to include the runtime). For all other compilation or rendering types, the default is `false`{.language-javascript}.
  `name`{.language-javascript}                     `string`{.language-javascript}          The name of the template function. Only applies to `compileClient`{.language-javascript} functions. Defaults to `'template'`{.language-javascript}.

#### Template Inheritance []() {#template-inheritance-a-idinheritancea .mume-header}

-   Pug supports template inheritance. Template inheritance works via
    the `block`{.language-javascript} and
    `extends`{.language-javascript} keywords.

    #### `block`{.language-javascript}

    -   in a template, a `block`{.language-javascript} is simply a
        "block" of Pug that a child template may replace.
        -   This process is recursive
    -   Pug blocks can optionally provide default content.

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    //- layout.pug
    html
      head
        title My Site - #{title}
        block scripts
          script(src='/jquery.js')
      body
        block content
        block foot
          #footer
            p some footer content
    ```

    -   Pug allows you to `replace`{.language-javascript} (default),
        `prepend`{.language-javascript}, or
        `append`{.language-javascript} blocks.

        -   When using `block append`{.language-javascript} or
            `block prepend`{.language-javascript}, the word "
            `block`{.language-javascript}" is optional:

        ``` {.language-pug data-role="codeBlock" data-info="pug"}
        //- page.pug
        extends layout

        append head
          script(src='/vendor/three.js')
          script(src='/game.js')
        ```

    #### `extends`{.language-javascript}

    -   extend block layout with a path to the parent template
    -   define one of more blocks to override the parent block content
    -   also possible to override a block to provide additional blocks

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    //- page-a.pug
    extends layout.pug

    block scripts
      script(src='/jquery.js')
      script(src='/pets.js')

    block content
      h1= title
      - var pets = ['cat', 'dog']
      each petName in pets
        include pet.pug
    ```

#### Buffered vs Unbuffered Code {#buffered-vs-unbuffered-code .mume-header}

-   **Unbuffered code** starts with a minus (
    `-`{.language-javascript}). It doesn't directly add anything to the
    output, but its values may be used from within Pug.
-   **Buffered code**, on the other hand, starts with an equals (
    `=`{.language-javascript}). It evaluates a JavaScript expression and
    outputs the result.

#### Interpolation []() {#interpolation-a-idinterpolationa .mume-header}

-   String interpolation is the process of replacing one or more
    placeholders in a template with a corresponding value.

    -   buffered input offers one method of doing this.
-   Another is using `#{}`{.language-javascript}. Here, Pug will
    evaluate any code between the curly brackets, escape it, and render
    it into the template

      Syntax                                                Action
      ----------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------
      `res.render(path, variables)`{.language-javascript}   Searches for a pug file to render at path "path", and passes "variables" to it
      `#{variable}`{.language-javascript}                   Interpolates "variable" inline with the surrounding Jade code, after evaluating "variable"
      `!{variable}`{.language-javascript}                   Interpolates "variable" inline with the surrounding Jade code, without evaluating "variable".
      `#[element]`{.language-javascript}                    Interpolates "element" inside of an existing Pug HTML element. Syntax of interpolated HTML elements is identical to that of normal HTML elements.

      Parameter   Details
      ----------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      path        Used in `res.render`{.language-javascript}. This is the path of the Pug file that we are going to render. The path is taken from the root of the folder set on your Express app: `app.set("views", "templates/views")`{.language-javascript}. For example, `res.render("index")`{.language-javascript} will search for a Pug file at `templates/views/index.pug`{.language-javascript}. Subdirectories can be specified too; `res.render("admin/index")`{.language-javascript} looks for a Pug file at `templates/views/admin/index.pug`{.language-javascript}.
      variables   Used in `res.render`{.language-javascript}. A JavaScript object of variables to be made accessible to the Pug file defined by `path`{.language-javascript} (above). Within the Pug file, the keys of the above JavaScript object become available as variables. If `variables = {title: "Hello", color: "red"}`{.language-javascript}, we could use the `title`{.language-javascript} and `color`{.language-javascript} variable. Subproperties of nested objects are also available.
      variable    Used in bracket syntax `#{}`{.language-javascript} or `!{}`{.language-javascript}. The value of `variable`{.language-javascript} will be output in the context of its surrounding Pug code. If a pound symbol is prepended to the opening curly bracket, `variable`{.language-javascript} will be evaluated before being output. If an exclamation point is prepended to the opening curly brace, `variable`{.language-javascript} **will not** be evaluated.
      element     Used in square bracket syntax `#[]`{.language-javascript}. The HTML element (in Pug syntax, not normal HTML syntax) will be evaluated and output inline with the surrounding Pug code.

#### Iteration []() {#iteration-a-iditerationa .mume-header}

-   Pug supports two primary methods of iteration:
    `each`{.language-javascript} and `while`{.language-javascript}.

    #### `each`{.language-javascript}

    Iterate over arrays and objects in a template:

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    ul
      each val in [1, 2, 3, 4, 5]
        li= val
    ```

    Capture index as you iterate:

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    ul
      each val, index in ['zero', 'one', 'two']
        li= index + ': ' + val
    ```

    Iterate over the keys in an object:

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    ul
      each val, key in {1: 'one', 2: 'two', 3: 'three'}
        li= key + ': ' + val
    ```

    Add an `else`{.language-javascript} block in the case that the array
    or object are empty

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    - var values = [];
    ul
      each val in values
        li= val
      else
        li There are no values
    ```

    #### `while`{.language-javascript}

    -   Create a loop with `while`{.language-javascript} keyword:

    ``` {.language-pug data-role="codeBlock" data-info="pug"}
    - var n = 0;
    ul
      while n < 4
        li= n++
    ```

* * * * *

* * * * *

       - [Jump to...](#jump-to)

-   [Pug](#pug)\
     - [Installation](#installation)\
     - [Pug Syntax](#pug-syntax-a-idsyntaxa)\
     - [Classes, IDs and Attributes](#classes-ids-and-attributes)\
     - [Plain Text and Text Blocks](#plain-text-and-text-blocks)\
     - [Comments](#comments)\
     - [Rendering Proccess of
    Pug](#rendering-proccess-of-pug-a-idrendera)\
     -
    [`pug.compile(source, options)`{.language-javascript}](#pugcompilesource-options)\
     -
    [`pug.render(source, options, callback)`{.language-javascript}](#pugrendersource-options-callback)\
     - [Options](#options-a-idoptionsa)\
     - [Template Inheritance](#template-inheritance-a-idinheritancea)\
     - [Buffered vs Unbuffered Code](#buffered-vs-unbuffered-code)\
     - [Interpolation](#interpolation-a-idinterpolationa)\
     - [Iteration](#iteration-a-iditerationa)

≡
