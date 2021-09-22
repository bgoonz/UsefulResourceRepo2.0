## Render templates

The `render` method takes the following arguments:

- `template` **{String|Object}**: the template may be a string, or a [cached template](./templates.md).
- `locals` **{Object}**: data to be passed to templates
- `callback` **{Function}**

**Examples**

Template passed as a string:

```js
var context = {name: 'Brian'};

app.render('Hello: <%= name %>!', context, function() {
  console.log(res);
  //=> Hello: Brian!
});
```

Template passed as an object:

```js
var context = {name: 'Brian'};
// register a template first
app.page('foo.md', {content: 'Hello: <%= name %>!'})

// pass the name of the template to the render method
app.render('foo.md', context, function() {
  console.log(res);
  //=> Hello: Brian!
});

// or you can pass the actual template object
var tmpl = app.getPage('foo.md');

app.render(tmpl, context, function() {
  console.log(res);
  //=> Hello: Brian!
});
```
