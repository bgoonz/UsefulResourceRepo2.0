# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

#   sequence :email do |n|
#     "exemple#{n}@exemple.com"
#   end

  factory :user, :aliases => [:author] do
    sequence(:name){|n| "Test User #{n}"}
    sequence(:email){|n|"person#{n}@example.com"}
    password 'please'
    password_confirmation 'please'
    # required if the Devise Confirmable module is used
    confirmed_at Time.now
  end
end