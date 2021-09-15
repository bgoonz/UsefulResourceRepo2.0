# Bcc

Add a BCC to all emails sent with action mailer via an interceptor.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'bcc'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install bcc

## Usage

In an initializer set the emails

```rb
BCC_EMAILS = [
  'fred@flinstone.com',
  'velma@flinstone.com
]
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
