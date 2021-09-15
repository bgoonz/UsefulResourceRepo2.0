# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :news do
    author
    sequence(:body_en){|n|"News #{n} body (en)"}
    sequence(:body_fr){|n|"News #{n} body (fr)"}
  end
end
