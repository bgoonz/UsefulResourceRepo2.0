

steps_for :links_to_activities do

  step "activities: :word_list" do |word_list|
    activity_names = extract_words_from word_list
    activities     = []
    activity_names.each do |activity_name|
      activities  << Activity.new( name: activity_name )
    end
    Activity.stub(:all).and_return activities
  end

  step "I visit the main page" do
    visit main_page_path
  end

  step 'I should see a list of links to the activities: :word_list' do |word_list|
    within the 'activities-list' do
      activity_names = extract_words_from word_list
      activity_names.each do |activity_name|
        page.should have_css  'a', text: activity_name
      end
    end
  end

end