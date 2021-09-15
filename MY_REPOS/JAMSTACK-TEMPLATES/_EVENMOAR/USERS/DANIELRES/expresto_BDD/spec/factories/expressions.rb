# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :expression do
    language
    author
    sequence(:body){|n|"Expression #{n} body"}
    sequence(:meaning){|n|"Expression #{n} meaning"}
    #source_type Expression::SOURCE_TYPES.first
    sequence(:source_info){|n|"Expression #{n} source info"}
    created_by_author true
  end
end
