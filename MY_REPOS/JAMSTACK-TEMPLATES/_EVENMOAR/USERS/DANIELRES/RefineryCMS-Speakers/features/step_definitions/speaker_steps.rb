Given /^I have no speakers$/ do
  Speaker.delete_all
end

Given /^I (only )?have speakers titled "?([^\"]*)"?$/ do |only, titles|
  Speaker.delete_all if only
  titles.split(', ').each do |title|
    Speaker.create(:firstname => title)
  end
end

Then /^I should have ([0-9]+) speakers?$/ do |count|
  Speaker.count.should == count.to_i
end
