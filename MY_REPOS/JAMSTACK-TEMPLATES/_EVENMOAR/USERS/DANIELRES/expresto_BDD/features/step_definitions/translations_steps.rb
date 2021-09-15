When(/^I add my english translation "(.*?)" that means "(.*?)"$/) do |litteral, semantic|
  within the 'translations-list' do
    click the 'add-translation-button'
  end
  within the 'translation-adder' do
    fill_in 'translation[body_litteral]', with: litteral
    fill_in 'translation[body_semantic]', with: semantic
    select('English', from: 'translation[language_id]')
    find('button').click
  end

end