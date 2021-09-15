FactoryGirl.define do

  factory :activity do
    user
    created_at Time.now
    updated_at Time.now
    details {}

    trait :updated do
      action :updated
    end

    trait :a_news_item do
      association :object, factory: :news_item
    end

  end

end
