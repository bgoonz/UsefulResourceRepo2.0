When(/^I add a comment to the expression$/) do
  visit expression_path Expression.last, locale: Language.last.code
  within the 'comment-adder' do
    fill_in 'comment_body', with: my_comment.body
    click the 'submit-button'
  end
end

Then(/^I should see my comment$/) do
  page.should have_content my_comment.body
end

