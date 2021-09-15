# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :news_item, :class => 'News::Item' do
    summary "MyText"
    body "MyText"
  end
end
