When /^I click the "(.*?)" link$/ do |name|
  find("a[data-purpose='#{name}']").click
end
