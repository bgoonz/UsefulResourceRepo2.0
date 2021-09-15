When /^I fill in "(.*?)" with "(.*?)"$/ do |field, content|
  fill_in field, :with => content
end

# When /^I click the submit button$/ do
#   find("input[type=submit]").click
# end

When /^I choose "(.*?)"$/ do |target|
  choose(target)
end

When /^I select "(.*?)" from "(.*?)"$/ do |option, group|
  select(option, :from => group)
end
