# Dashing JSON

Make your JSON absolutely dashing in your rails HTML views since, sometimes, you need to display a raw blob.

Dashing JSON uses a `dashing-json` data element to store the JSON string, which is then parsed into a `ul` with specific `li` elements and corresponding classes: key, string, boolean, null, and number.  It comes with default styling so your JSON blob is sure to look dashing right out of the box.

### Before

```
{"data": { "key": null, "can_read": false } }
```

### After

```json
{
  "data": {
    "key": null,
    "can_read": false
  }
}
```

Yeah, that's right. Egyptian curly braces (you can change that if you want).

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'dashing_json'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install dashing_json

#### Next, you need to require the `.js.coffee` and `.css.scss` assets:

If you're using sprockets, add the following to your `application.css`:

    *= require dashing_json

If you're using an `application.css.scss` file:

```scss
@import "dashing_json";
```

And, include the scripts with the following in your `application.js`

    *= require dashing_json

## Usage

Now, you simply need to instantiate the JSON blob in you controller:

```ruby
class ModelController < ApplicationController

# ...

  def show
    @model = Model.find(params[:id])
    @json_blob = @model.to_json
  end

# ...
```

And, then call the `dashing_json` method in your view:

```erb
<%= # ... %>

<%= dashing_json(@json_blob) %>

<%= # ... %>
```

That's it, your JSON is now dashing.

## Customization

Overriding the default colors of the syntax highlighting is simple since they're just variables. If you're using scss, and would like to customize the styles, you can add the following before you import the stylesheet in `plugins/_dashing_json.scss`:

```scss
$dashing-json-key-color:     $your-color;
$dashing-json-string-color:  $your-color;
$dashing-json-number-color:  $your-color;
$dashing-json-boolean-color: $your-color;

@import "dashing_json";
```

Be sure to import this file in your `application.css.scss`.

If you aren't using sass, the selectors would be something like: 

```css
.dashing-json .key,
.dashing-json .null,
.dashing-json .string,
.dashing-json .boolean,
.dashing-json .number {
  /* custom styling here */
}
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
