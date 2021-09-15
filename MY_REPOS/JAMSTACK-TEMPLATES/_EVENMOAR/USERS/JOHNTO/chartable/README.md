# chartable

__Work in progress.__

See it in action here: <http://johnotander.com/chartable/>

A ruby port of [chartable](https://github.com/jxnblk/chartable).
No js, no network calls, just svg.

## Installation

Add this line to your application's Gemfile

```ruby
gem 'chartable'
```

And then execute

    $ bundle

Or install it yourself as

    $ gem install chartable

## Usage

##### Chartable.bar

```erb
<%= Chartable.bar(data, { height: 300, width: 800 }) %>
```

###### Options

- `height`
- `width`

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

***

  Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).
