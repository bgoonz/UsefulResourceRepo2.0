# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :language do
    sequence(:code){|n|"l#{n}"}
    sequence(:name){|n|"Language#{n}"}
  end

end
