
When /^I visit the english homepage$/ do
  visit '/en'
end

When /^I visit the homepage$/ do
  visit '/'
end

Then(/^I should( not)? see these contents:$/) do |negate, table|
  table.hashes.each do |attributes|
    negate ? page.should_not(have_content(attributes[:content])) : page.should(have_content(attributes[:content]))
  end
end

Then /^I should see "(.*?)"$/ do |arg1|
  page.should have_content(arg1)
end

Then /^I should not see "(.*?)"$/ do |arg1|
  page.should_not have_content(arg1)
end

Then 'show me the page' do
  save_and_open_page
end

When /^I should not see a "(.*?)" link$/ do |cssclass|
  page.should_not have_selector("a.#{cssclass.downcase}")
end

When /^I click on the "(.*?)" link$/ do |class_name|
  find("a.#{class_name}").click
end

When /^I click on "(.*)"$/ do |text|
  click_on text
end