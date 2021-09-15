# BASSCSS for Rails

Include BASSCSS, the next-level CSS toolkit, in your Rails apps through the assets pipeline.

Repackaged from <https://github.com/jxnblk/basscss> by Brent Jackson.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'basscss-rails'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install basscss-rails

##### Using Sass

You will then need to require the stylesheet in your application.scss:

```scss
@import "basscss/basscss";
```

##### Using CSS

Or, in your application.css:

```css
*= require basscss/basscss
```

##### Using the [Basscss addons](https://github.com/basscss/addons)

You will need to import the `basscss-addons` file, too:

###### Sass

```scss
@import "basscss/basscss-addons";
```

###### CSS

Or, in your application.css:

```css
*= require basscss/basscss-addons
```

## Usage

Further documentation can be found on the BASSCSS website: <http://www.basscss.com/docs/>

## Contributing

1. Fork it ( https://github.com/johnotander/basscss/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Acknowledgements

  * The CSS toolkit is written by Brent Jackson: <https://github.com/jxnblk/basscss>

More documentation available at <http://www.basscss.com/docs/>.
