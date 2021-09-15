FactoryGirl.define do

  factory :person, class: :user do

    sequence(:first_name){ |n| "Person#{n} firstname" }
    sequence(:last_name){ |n| "Person#{n} lastname" }
    sequence(:email){ |n| "person#{n}@example.com" }
    password 'changeme'
    password_confirmation 'changeme'

    factory :listable_person do
      after(:create) { |person| person.add_role(:admin) }
    end

  end

end
