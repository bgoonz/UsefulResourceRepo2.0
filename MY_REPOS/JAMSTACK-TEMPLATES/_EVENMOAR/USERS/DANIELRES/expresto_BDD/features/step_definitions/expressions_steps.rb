When(/^I click on the first expression$/) do
  all('.expression a').first.click
end


Then(/^I should see (\d+) (.*?) expressions$/) do |count, language|
  lang = language[0..1]
  page.should have_css ".expression[lang=#{lang}]", count: count
end



When(/^I change the expression "(.*?)" to "(.*?)"$/) do |original, updated|
  e = Expression.find_by_body original
  visit expression_path e, locale: Language.last.code
  page.should have_content original
  find('a.update-expression').click
  within the 'add-expression-form' do
    fill_in 'expression_body', with: updated
    click the 'submit-button'
  end
end

Given(/^these expressions:$/) do |table|
  table.hashes.each do |attributes|
    FactoryGirl.create :expression, body: attributes[:text], language: Language.first
  end
end

Given(/^my expressions are:$/) do |table|
  table.hashes.each do |attributes|
    FactoryGirl.create( :expression, body: attributes[:text], author: logged_user, language: Language.last)
  end
end

Given(/^I visit the expressions page$/) do
  visit expressions_path locale: Language.last.code
end

When /^I visit the expression$/ do
  visit expression_path Expression.last, locale: Language.last.code
end

When /^I add(?:ed) my expression$/ do

  click the "add-expression-button"

  within the "add-expression-form" do
    fill_in "expression_body",         with:  my_expression.body
    fill_in "expression_meaning",      with:  my_expression.meaning
    fill_in "expression_source_info",  with:  my_expression.source_info
    find(   "#expression_created_by_author_true" ).click
    click the "submit-button"
  end

end

Then /^I should see my expression and its details$/ do
  e       = my_expression
  details = [ e.body, e.meaning, e.source_info ]
  details.each{ |detail| page.should have_content detail }
end

# Then /^I should see a link to my public profile$/ do
#   page.should have_css "a", text: my_expression.author.name
# end

def dom_id object
  "#{object.class.name.underscore}_#{object.id}"
end

Then /^I should see a link to my expression$/ do
  e = my_expression
  page.should have_css "a", text: e.body
end


When /^I attempt to add an expression$/ do
  click the "add-expression-button"
end

Given /^(\d+) expressions?$/ do |amount|
  amount.to_i.times{ FactoryGirl.create :expression }
end

Given /^(\d+) english expressions?$/ do |amount|
  l = Language.where( code: 'en', name: 'English').first_or_create
  amount.to_i.times{ FactoryGirl.create :expression, language: l }
end

Given /^(\d+) french expressions?$/ do |amount|
  l = Language.where( code: 'fr', name: 'French').first_or_create
  amount.to_i.times{ FactoryGirl.create :expression, language: l }
end

Given(/^a french expression "(.*?)"$/) do |body|
  l = Language.where( code: :fr, name: 'French' ).first_or_initialize
  FactoryGirl.create :expression, language: l, body: body
end

Given(/^1 english expression "(.*?)"$/) do |body|
  l = Language.where( code: :en, name: 'English' ).first_or_initialize
  FactoryGirl.create :expression, language: l, body: body
end

Then /^I should see a link list with (\d+) expressions in (.*)$/ do |amount, language|
  code = language.downcase[0..1]
  find('ul.expressions').should have_selector(
    "li.expression[lang='#{code}'] a[href^='/#{code}/expressions/']",
    count: amount
  )
end

Given /^(\d+) (.*) expressions? by (.*)$/ do |qty, language, user|
    l = Language.find_by_code(language.downcase[0..1]) || FactoryGirl.create(:language, name: language.downcase.strip, code: language.downcase[0..1])
    u = User.find_by_name(user) || FactoryGirl.create(:user, name: user)
    qty.to_i.times do |n|
      FactoryGirl.create(:expression, language: l, author: u)
    end
end

Then /^I should see the expression page with details and (.*) as author$/ do |author|
  within '.expression.presenter' do
    page.should have_selector('.body')
    page.should have_selector('.meaning')
    find('div.expression .author').should have_content(author)
  end
end

