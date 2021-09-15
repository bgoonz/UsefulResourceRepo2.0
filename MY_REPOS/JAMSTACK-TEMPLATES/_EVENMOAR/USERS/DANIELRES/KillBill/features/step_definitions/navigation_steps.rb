Then(/^I should see (\d+) invoices?$/) do |qty|
  expect( page ).to have_selector( ".invoice", count: qty )
end

Then(/^I should see (.*) within the (.*)$/) do |contents,element|
  contents = contents.split(', ').map{ |c| c.gsub('"','') }
  within ".#{element}" do
    contents.each{ |c| expect(page).to have_content(c) }
  end
end
