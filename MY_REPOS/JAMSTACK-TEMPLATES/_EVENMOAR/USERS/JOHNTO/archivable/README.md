# archivable [![Build Status](https://travis-ci.org/johnotander/archivable.svg?branch=master)](https://travis-ci.org/johnotander/archivable)

Archive your Rails models rather than delete them. This provides the archiving functionality app so you can do the following:

##### In your models

```ruby
user.archived?  #=> false
user.archive!   #=> true
user.archived?  #=> true
user.unarchive! #=> true
user.archived?  #=> false
```

##### In your views

```html+erb
<% if user.archived? %>
  <%= link_to :Archive, archive_user_path(user) %>
<% else %>
  <%= link_to :Unarchive, archive_user_path(user) %>
<% end %>
```

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'archivable'
```

And then execute:

```
$ bundle
```

Or install it yourself as:

```
$ gem install archivable
```

## Usage

### Database Migration

First, you need to add the `archived` column to your model (which we we call `User` for this example):

```
$ rails g migration add_archived_to_users archived:boolean
$ rake db:migrate
```
NOTE: remember to edit the migration and set `:archived` column to default to `false` in order to simplify querying for non-archived models.

```
  add_column :users, :archived, :boolean, default: false
```

### Application Routes

In your routes file (`config/routes.rb`):

```ruby
My::Application.routes.draw do
  resources :users do
    get archive,  on: :member
    get archived, on: :collection
  end
end
```

### The Model

Next, you need to include the model concern to gain access to some handy methods.

```ruby
class User < ActiveRecord::Base
  include Archivable::Model

  # ...
end
```

### The Controller

Lastly, you need to include the controller concern to handle the controller actions.

```ruby
class UsersController < ApplicationController
  include Archivable::Controller

  def index
    @users = User.where(archived: false)
  end

  # ...
end
```

### That's it.

Now, instead of a delete link, you can do the following:

```html+erb
<%= link_to user.archived? ? :Unarchive : :Archive, archive_user_path(user) %>
<%= link_to 'See Archived Users', archived_users_path %>
```

## Contributing

1. Fork it ( http://github.com/johnotander/archivable/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
