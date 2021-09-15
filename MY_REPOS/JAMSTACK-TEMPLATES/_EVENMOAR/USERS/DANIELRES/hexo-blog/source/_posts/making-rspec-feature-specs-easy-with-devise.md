title: Better feature specs with authentication
sub: Making them easier to writer and faster to execute
date: 2013-01-16 12:22
comments: true
categories:

- programming
- testing
- ruby
  tags:
- rspec
- integration-tests
- devise
- rails
- capybara

---

&nbsp;

<!-- more -->

I love writing feature specs with Rspec and Capybara.
In fact, I prefer this way over using cucumber. The process is cleaner and faster for me and works well for the actual project I'm working on.

Most of the features of the ror app I'm working on require authentification, so normally that implies that, for each feature spec, I have to make capybara follow all the authentication steps.

But I's too much repetition in my eyes, because it slows down the test suite while authentication is already covered by its own integration tests.

So, is there a faster, lighter way to make this authentication happen ?

Upon investigation, I discovered that Devise doesn't provide authentication helpers for integration/feature specs, which is justified as it contradicts the idea of full-stack testing.

But warden, on which Devise is based, provides this functionality.

### Here we go with an example

Beware: when you use this technique, you don't write full integration tests anymore in favor of taking a shortcut.
A useful one IMHO as long as you know what you do.

This means you already should have authentication well tested, with its complete set of integration tests.

#### A barebones example

{% codeblock file:spec/features/admin_users_datatable.rb lang:ruby %}
require 'spec_helper'
include Warden::Test::Helpers ## including some warden magic
Warden.test_mode! ## telling warden we are testing stuff

feature "(...)" do
context "(...)" do

    before(:each) do
      admin = FactoryGirl.create(:admin)
      login_as(admin , :scope => :user)   ## our instant magic authentication
    end

    scenario "(...)", js: true do
      visit admin_users_path
      # (...)
    end

end
end

{% endcodeblock %}

#### A working example, with some more flesh around bones

{% codeblock file:spec/features/admin_users_datatable.rb lang:ruby %}
require 'spec_helper'
include Warden::Test::Helpers
Warden.test_mode!

feature "admin searching for a specific user" do
context "when logged in as admin" do

    before(:each) do
      admin = FactoryGirl.create(:admin)
      login_as(admin , :scope => :user)

      user1 = FactoryGirl.create(:user, email: 'foo@foo.com')
      user2 = FactoryGirl.create(:user, email: 'bar@bar.com')
    end

    scenario "admin searches for a specific user", js: true do
      visit manage_users_path
      page.body.should     have_content 'foo@foo.com'
      page.body.should     have_content 'bar@bar.com'
      fill_in 'Search', with: 'foo'
      page.body.should     have_content 'foo@foo.com'
      page.body.should_not have_content 'bar@bar.com'
    end

end
end

{% endcodeblock %}

#### More info

- [The classic, clean, full-stach way to do this](http://robots.thoughtbot.com/post/33771089985/rspec-integration-tests-with-capybara)
- [Rspec's feature specs](https://www.relishapp.com/rspec/rspec-rails/docs/feature-specs/feature-spec)
