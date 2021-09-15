# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :user do

    sequence(:first_name) { |n| "New user #{n}" }
    sequence(:last_name ) { |n| "New user #{n}" }
    password 'changeme'
    password_confirmation 'changeme'
    confirmed_at Time.now
    sequence(:email) { |n| "person-#{n}@example.com" }

    factory :no_roles_user do
      email 'regular@example.com'
    end

    factory :super_user do
      first_name 'Superuser'
      last_name 'Superuser'
      email 'super@example.com'
      after(:create) {|user| user.add_role(:admin)}
    end

  end


end
