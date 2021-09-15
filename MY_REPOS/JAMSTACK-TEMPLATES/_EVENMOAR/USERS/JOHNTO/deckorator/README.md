# deckorator [![Build Status](https://travis-ci.org/johnotander/deckorator.svg?branch=master)](https://travis-ci.org/johnotander/deckorator)

Deckorator is a PORO (plain old Ruby object) implementation of the [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern) pattern.
It can be easily integrated into Rails/Sinatra apps or any other Ruby project.

## Installation

```ruby
gem 'deckorator'
```

Then run bundler

```sh
$ bundle
```

Or, install it yourself as

```sh
$ gem install deckorator
```

#### With Rails

Include `Deckorator` in the application controller

```rb
class ApplicationController < ActionController::Base
  include Deckorator
end
```

Then, run the install generator

```sh
$ rails g deckorator:install
```

An application decorator will be placed in `app/decorators`.

## Usage

Using the `decorate` method in the controller

```rb
class UsersController < ApplicationController
  before_action :set_user

  def show
    @user = decorate(@user)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
```

#### Example decorator

```rb
class UserDecorator < ApplicationDecorator
  def full_name
    if first_name.blank? && last_name.blank?
      'Unnamed User'
    else
      "#{first_name} #{last_name}".strip
    end
  end
end
```

#### There's a generator

```sh
$ rails g deckorator:decorator user
```

This will create a `UserDecorator` in the `app/decorators` directory while also generating a stubbed test.

#### Also using Pundit?

You might want to add this to your **app/decorators/ApplicationDecorator**:

```rb
def self.policy_class
  "#{decorated_object_class}Policy"
end
```

#### Add view helpers to your decorators

```rb
class UserDecorator < ApplicationDecorator
  include ActionView::Helpers

  def profile_card
    content_tag_for(:div, decorated_object, class: :profile) do
      gravatar_image(email)
    end
  end
end
```

#### Include Rails path helpers

```rb
class UserDecorator < ApplicationDecorator
  include Rails.application.routes.url_helpers
  include ActionView::Helpers

  def full_name_link
    link_to(full_name, user_path(decorated_object), class: 'btn btn-primary')
  end
end
```

#### Decorate associations

```rb
class PostDecorator < ApplicationDecorator
  def comments
    Deckorator.decorate(decorated_object.comments)
  end
end
```

## Related

* <https://github.com/drapergem/draper>
* <https://github.com/elabs/pundit>

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

***

> Crafted with <3 by [John Otander](https://twitter.com/4lpine) and [Jake Mays](https://github.com/bravely).
