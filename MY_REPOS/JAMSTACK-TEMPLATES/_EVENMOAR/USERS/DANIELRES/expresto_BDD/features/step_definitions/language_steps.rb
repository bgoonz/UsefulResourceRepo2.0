Given /^languages?: (.*)$/ do |languages|
  languages.split(', ').each do |l|
      Language.create code: l[0..1].downcase, name: l.strip
  end
end

When /^I set language to (.*)$/ do |language|
  click_link language.downcase[0..1]
end

