# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :comment do
    user
    sequence(:body){|n|"Comment #{n} body"}
    commentable_type 'Expression'
    commentable_id 1
  end
end
