When /^I visit my public profile$/ do
  visit user_path logged_user, locale: :en
end
