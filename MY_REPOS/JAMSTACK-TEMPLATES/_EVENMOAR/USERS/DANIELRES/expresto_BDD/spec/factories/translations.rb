# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :translation do
    expression
    language
    sequence(:body_litteral){|n|"Litteral translation #{n}"}
    sequence(:body_semantic){|n|"Semantic translation #{n}"}
    author
  end
end
