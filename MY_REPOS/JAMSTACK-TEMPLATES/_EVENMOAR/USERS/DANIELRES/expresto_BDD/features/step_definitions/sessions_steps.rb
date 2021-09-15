
Given /^I am logged in$/ do
  visit new_user_session_path
  within the 'sign-in-form' do
    fill_in "user_email"   , with: logged_user.email
    fill_in "user_password", with: logged_user.password
    click the 'submit-button'
  end
  find( the 'userbox' ).should have_content logged_user.name
end

When /^I am not logged in$/ do
  visit destroy_user_session_path
  within the 'userbox' do
    find the 'sign-in-button'
  end
end

Then /^I should see how to log in$/ do
  href = new_user_session_path locale: 'en'
  find the 'sign-in-button'
end

Then /^I should see an obvious way to log in$/ do
  within the 'main-content' do
    find the 'sign-in-form'
    find the 'sign-up-form'
  end
end