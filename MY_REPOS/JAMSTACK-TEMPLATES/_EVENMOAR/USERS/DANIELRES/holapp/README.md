# Marketplace

An app for keeping track of projects and people in a company, in a decentralized (self-management) way.

Build status: [![Build Status](https://codeship.com/projects/d8f61ba0-7f01-0132-a114-2e836c3b0aef/status?branch=master)](https://codeship.com/projects/57138)

## Installation

### Prerequisites

1. rvm (or an other ruby version manager)
   https://rvm.io/
2. install ruby `rvm install RUBY_VERSION`
   (find the correct ruby version for the project on top of file `Gemfile`)
3. bundler
   `gem install bundler`
4. node (using nvm is recommendend)
   https://github.com/creationix/nvm#install-script
5. postgresql
6. heroku toolbelt (command-line for heroku)
   https://toolbelt.heroku.com/
7. xvfb (to run selenium tests in a virtual framebuffer)
8. Firefox v35 binary (to run javascript selenium tests that need to run in Firefox)
   1. download from https://ftp.mozilla.org/pub/firefox/releases/35.0b8/linux-x86_64/en-US/firefox-35.0b8.tar.bz2
   2. unpack, and move it as `/opt/firefox35` (needs sudo)
   3. make sure `/opt/firefox35/firefox-bin` exists
9. PhantomJS (to run headless selenium tests that need javascript)
   https://gist.github.com/julionc/7476620

### Basic install

1.  clone the app `git clone ...`
2.  use `bundle install`
3.  create or update your local file `app/config/database.yml`:

        development:
          adapter:  'postgresql'
          encoding: 'utf8'
          database: 'marketplace'
          username: 'USERNAME'
          password: 'PASSWORD'
          host:     'localhost'

        test:
          adapter:  'postgresql'
          encoding: 'utf8'
          database: 'marketplace-test'
          username: 'USERNAME'
          password: 'PASSWORD'
          host:     'localhost'

4.  create these 2 postgres databases locally (one for development and one for tests), according to the entries in your `database.yml` file
5.  run `rake db:migrate` then `rake db:test:prepare`

### Populate local dev DB with real content from production

1. take a snapshot of the db on heroku:

- `heroku pg:backups capture DATABASE_URL`
  - note the name of the snapshot given by heroku (for example `b008`)
- `heroku pg:backups public-url b008`
  (replace `b008` by the name of the snapshot)
  - heroku will present you the url to download the DB snapshot

2. you can use PgAdmin, (or your command tool) to import the snapshot in your local development DB.

## Running the app

### Using classic auth

- `rails s`
  - note: google authentication won't work
  - just login with your email + password using the login form.
  - you might need to set/reset your password using the command line:
    - `rails c`
    - `> u = User.find(YOUR_USER_ID)`
    - `> u.password = NEW_PASSWORD`
    - `> u.save`
  - now you can login with your email and the password you just set

### Using Google auth

- `GOOGLE_CLIENT_ID="..." GOOGLE_CLIENT_SECRET="..." rails s`
  - google authentication will work
    (but it's not really needed for dev and test)
  - (classic auth still works as well)
  - Google API credentials can be found in the [Google developer console for the project](https://console.developers.google.com/apis/credentials/oauthclient/973791483651-tmmscbnnndhbnfp9r683q8oovgorehk3.apps.googleusercontent.com?project=oxmarketplace)

## Tips for understanding the codebase

1. read the project history in the git log (you might want to use a tool like gitk)

- the git commit messages have been written carefully to make it easier for new developers to join the project. It follows the convention of having a first line as a short summary, followed by explanations in the form of bullet lists.

2.  The project follows usual conventions and best practices, most of the code will feel natural for someone familiar with Ruby & Rails, but it also features some non-conventional approaches (see use_cases, explained below).
3.  run the specs (with commad `rspec`)
4.  browse through the specs and read the specs to learn about the applicatoin structure and behaviors (in `app/spec`), (especially the use_case and feature specs):

        ├── best_in_place_spec_helper.rb
        ├── controllers
        │   └── users_controller_spec.rb
        ├── factories
        │   └── users.rb
        ├── features
        │   ├── adding_a_person_spec.rb
        │   ├── adding_a_project_spec.rb
        │   ├── adding_a_tag_to_self_spec.rb
        │   ├── administrating_users_roles_spec.rb
        │   ├── authentication_spec.rb
        │   ├── deleting_a_duration_spec.rb
        │   ├── deleting_a_membership_spec.rb
        │   ├── deleting_a_person_spec.rb
        │   ├── deleting_a_project_spec.rb
        │   ├── deleting_a_tagging_spec.rb
        │   ├── deleting_a_tag_spec.rb
        │   ├── editing_a_membership_spec.rb
        │   ├── editing_a_person_spec.rb
        │   ├── editing_a_project_spec.rb
        │   ├── editing_a_tagging_spec.rb
        │   ├── editing_a_tag_spec.rb
        │   ├── forecasts
        │   │   └── viewing_a_person_forecasts_spec.rb
        │   ├── home_page_spec.rb
        │   ├── merging_tags_spec.rb
        │   ├── news
        │   │   ├── administrating_news_users_configurations_spec.rb
        │   │   ├── editing_a_news_item_spec.rb
        │   │   ├── item_page_spec.rb
        │   │   ├── managing_user_configuration_spec.rb
        │   │   ├── previewing_the_digest_spec.rb
        │   │   ├── quick_adding_a_news_item_spec.rb
        │   │   ├── quick_deleting_a_news_item_spec.rb
        │   │   ├── quick_editing_a_news_items_in_markdown_spec.rb
        │   │   ├── quick_editing_a_news_item_spec.rb
        │   │   ├── quick_filtering_news_items_spec.rb
        │   │   ├── quick_tagging_a_news_item_spec.rb
        │   │   ├── spec_helper.rb
        │   │   └── transforming_a_news_item_urls_to_links_spec.rb
        │   ├── person_page_spec.rb
        │   ├── project_page_spec.rb
        │   ├── shared_examples_for_taggables_spec.rb
        │   ├── tag_page_spec.rb
        │   ├── tags_page_spec.rb
        │   ├── viewing_activities_spec.rb
        │   ├── viewing_cvs_spec.rb
        │   └── viewing_tops_spec.rb
        ├── html_fragment_spec_helper.rb
        ├── javascripts
        │   ├── app
        │   │   └── controllers
        │   │       └── news_items_controller_spec.coffee
        │   ├── spec_helper.js.coffee
        │   └── support
        │       └── jasmine.yml
        ├── lib
        │   ├── markdown_renderer_spec.rb
        │   └── md_linker_spec.rb
        ├── mailers
        │   └── news
        │       └── mailer_spec.rb
        ├── models
        │   ├── activity_spec.rb
        │   ├── duration_spec.rb
        │   ├── fetcher_spec.rb
        │   ├── forecasts
        │   │   └── forecast_spec.rb
        │   ├── journal_spec.rb
        │   ├── membership_spec.rb
        │   ├── news
        │   │   ├── fetcher_spec.rb
        │   │   ├── item_spec.rb
        │   │   └── user_config_spec.rb
        │   ├── project_spec.rb
        │   ├── role_spec.rb
        │   ├── tagging_spec.rb
        │   ├── tag_spec.rb
        │   └── user_spec.rb
        ├── presenters
        │   ├── activities_presenter_spec.rb
        │   ├── cvs_presenter_spec.rb
        │   ├── global_view_presenter_spec.rb
        │   ├── memberships_presenter_spec.rb
        │   ├── news
        │   │   └── digest_presenter_spec.rb
        │   ├── people_presenter_spec.rb
        │   ├── person_presenter_spec.rb
        │   ├── project_presenter_spec.rb
        │   ├── projects_presenter_spec.rb
        │   ├── support
        │   │   └── presenter_helpers_spec.rb
        │   ├── tag_field_with_taggings_presenter_spec.rb
        │   ├── tag_presenter_spec.rb
        │   ├── tags_presenter_spec.rb
        │   ├── tag_taggings_presenter_spec.rb
        │   ├── tag_trees_presenter_spec.rb
        │   └── tops_by_tag_field_presenter_spec.rb
        ├── purpose_selector_spec_helper.rb
        ├── requests
        ├── routing
        ├── spec_helper.rb
        ├── support
        │   ├── anything_spec_helper.rb
        │   └── devise.rb
        ├── use_cases
        │   ├── adding_a_duration_spec.rb
        │   ├── adding_a_membership_spec.rb
        │   ├── adding_a_person_spec.rb
        │   ├── adding_a_project_spec.rb
        │   ├── adding_taggings_spec.rb
        │   ├── destroying_a_resource_spec.rb
        │   ├── merging_tags_spec.rb
        │   ├── news
        │   │   └── receiving_a_digest_email_spec.rb
        │   ├── shared_examples
        │   │   ├── authorization_requirers.rb
        │   │   ├── contexts.rb
        │   │   └── form_providers.rb
        │   ├── tagging_a_resource_spec.rb
        │   ├── updating_a_resource_spec.rb
        │   ├── viewing_a_taggable_taggings_spec.rb
        │   ├── viewing_a_tag_taggings_spec.rb
        │   ├── viewing_cvs_spec.rb
        │   ├── viewing_people_spec.rb
        │   ├── viewing_projects_spec.rb
        │   └── viewing_tags_spec.rb
        ├── view_context_spec_helper.rb
        └── views
            └── forecasts
                └── forecasts
                    └── index.json_spec.rb

5.  Note: the feature specs test the application full-stack, through a browser, and the UX.
6.  The use_case specs test every use_case file individually, on a lower lever level, without the UX.

## Use_case files

- Each file in this directory represents a real use-case, and encapsulates its flow, logic and steps programmatically. It is similar to the "Command pattern" (https://en.wikipedia.org/wiki/Command_pattern). It allows to make code simpler in models and controllers.
- A glance to this directory provides a reliable representation of what the app does, its features and possible actions (in `app/use_cases/`):

      ├── adding_a_duration.rb
      ├── adding_a_membership_from_person.rb
      ├── adding_a_membership_from_project.rb
      ├── adding_a_person.rb
      ├── adding_a_project.rb
      ├── adding_a_resource.rb
      ├── adding_taggings.rb
      ├── destroying_a_resource.rb
      ├── merging_tags.rb
      ├── news
      │   ├── receiving_a_digest_email.rb
      │   └── sending_all_digest_emails.rb
      ├── shared
      │   ├── inserts_an_activity.rb
      │   ├── is_an_advanced_callable.rb
      │   ├── presents_a_form.rb
      │   ├── sets_a_view_context.rb
      │   ├── updates_a_resource.rb
      │   └── uses_a_presenter.rb
      ├── tagging_a_resource.rb
      ├── updating_a_resource.rb
      ├── viewing_a_taggable_taggings.rb
      ├── viewing_a_tag_taggings.rb
      ├── viewing_cvs.rb
      ├── viewing_people.rb
      ├── viewing_projects.rb
      └── viewing_tags.rb

### Running specs (tests)

- `rspec`: runs all the tests
- `xvfb-run rspec`: runs all the tests headless

### Development workflow

#### Using zeus

Zeus allows to speed up development and tests execution by preloading rails and forking the process every time we lanch a rails command instead of restarting the whole process.

1. install: `gem install zeus`
2. activate: `zeus start` (in an other terminal)
3. launch rails commands by replacing them with `zeus`:

- `zeus s`
- `zeus c`
- `zeus rspec`
- ...

#### Using guard

1. maake sure zeus is running
2. run guard: `guard`
3. when a file changes, guard will run related tests automatically (TDD style)
4. guard monitors changes in files and assets and triggers a liverelad in the browser accordingly (no need to refresh manually)

### Deployment

1. run all tests (`rspec`)
2. `git push origin && git push heroku`

### CI

the project uses Codeship for continuous testing, you should have access to the project dashboard using your github credentials. https://codeship.com/projects/57138
