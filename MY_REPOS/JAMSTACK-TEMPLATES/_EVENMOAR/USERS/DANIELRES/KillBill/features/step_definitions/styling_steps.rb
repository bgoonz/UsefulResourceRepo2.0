When(/^I visit the (.*) stylesheet url$/) do |filename|
  visit "/#{filename}.css"
end

Then(/^the page should be styled$/) do
  expect( page.body ).to include 'main.css'
end


Then(/^I should see the stylesheet$/) do
  expect( page ).to have_content '/* KillBill stylesheet */'
end
