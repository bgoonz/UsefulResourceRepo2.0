steps_for :display_an_activity do

  step "an activity :name that was practiced during 3 months" do |name|
    @activity = Activity.new id: 1, name: name
    month1 = DateTime.new 2012, 1
    month2 = month1.next_month
    month3 = month2.next_month
    2.times{ @activity.facts << Fact.new( start_time: month1 ) }
    3.times{ @activity.facts << Fact.new( start_time: month2 ) }
    4.times{ @activity.facts << Fact.new( start_time: month3 ) }
    Activity.stub(:get).and_return @activity
  end

  step "I visit the activity page" do
    visit activity_path @activity
  end

  step "I should see :count timesheets" do |count|
    page.should have_the( 'timesheet', count: count )
  end

  step 'an activity practiced regularly during 1 month' do
    @activity       = Activity.new id: 1, name: 'drinking'
    start_time1     = Time.new 2013,1,1,1,0
    start_time2     = Time.new 2013,1,2,1,0
    duration1       = 10*60 # 10 minutes
    duration2       = 60*60 # 60 minutes
    description1    = 'smelling wine'
    description2    = 'tasting beer'
    fact1           = Fact.new( start_time: start_time1, end_time: start_time1 + duration1, description: description1 )
    fact2           = Fact.new( start_time: start_time2, end_time: start_time2 + duration2, description: description2 )
    @activity.facts = [ fact1, fact2 ]
    Activity.stub(:get).and_return @activity
    @expected = {
      fact1: { minutes_count: 10, description: 'smelling wine' },
      fact2: { minutes_count: 60, description: 'tasting beer'  },
      total_hours_count: 1.2,
      fact_count: 2
    }
  end

  step 'I should see the timesheet with its facts' do
    within the 'timesheet' do
      page.should have_the 'fact', count: @expected[:fact_count]
    end
    within all( the 'fact' )[0] do
      page.should have_the('minutes',       text: "#{@expected[:fact1][:minutes_count]}")
      page.should have_the('description',   text: "#{@expected[:fact1][:description]}")
    end
    within all( the 'fact' )[1] do
      page.should have_the('minutes',       text: "#{@expected[:fact2][:minutes_count]}")
      page.should have_the('description',   text: "#{@expected[:fact2][:description]}")
    end
    within the 'timesheet' do
      page.should have_the 'total-hours-count', text: "#{@expected[:total_hours_count]}"
    end
  end

end