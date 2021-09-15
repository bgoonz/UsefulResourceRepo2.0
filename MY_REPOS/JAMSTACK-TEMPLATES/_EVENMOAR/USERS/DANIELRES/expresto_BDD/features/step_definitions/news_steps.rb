Given(/^these news:$/) do |table|
  table.hashes.each do |attributes|
    published_at = ( attributes[:status] == 'published' ? Time.now : Time.now+1.day )
    u = User.find_by_name(attributes[:author]) || FactoryGirl.create(:user, name: attributes[:author])
    FactoryGirl.create(:news, published_at: published_at, author: u, body_en: attributes[:english_body], body_fr: attributes[:french_body])
  end
end
