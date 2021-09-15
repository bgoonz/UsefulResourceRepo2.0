require_relative 'spec_helper'

describe 'Viewing a persons forecasts' do

  context 'as superuser' do

    let(:super_user ){ create(:super_user) }
    let(:membership1){ create(:membership) }
    let(:duration   ) do
      Duration.create(
              durable: membership1,
            starts_at: '2015-02-01',
              ends_at: '2015-03-31',
           quantifier: 5,
        )
    end

    before do
      login_as(super_user, scope: :user)
    end

    before do
      User.enable_list_all!
    end
    after do
      User.disable_list_all!
    end

    context 'with a simple duration' do
      before do
        duration
      end
      it 'shows the person occupation periods'do
        visit forecasts_path(start_year: 2015, start_month: 1)
        within the('forecasts-list') do
          expect( page ).to have_css( "#membership_#{membership1.id} td", text: "5", count: 4 )
        end
      end
    end

    context 'with a set of durations having no quantifier' do
      before(:each) do
        duration.update( quantifier: nil )
      end
      it 'does not render the table row' do
        visit forecasts_path(start_year: 2015, start_month: 1)
        within the('forecasts-list') do
          expect( page ).not_to have_css( ".occupation", text: "—" )
        end
      end
    end

    context 'with a duration having no end_date' do
      before(:each) do
        duration.update( ends_at: nil )
      end
      it 'shows all future periods as occupied'do
        visit forecasts_path(start_year: 2015, start_month: 1)
        within the('forecasts-list') do
          expect( page ).to have_css( ".occupation", text: "5", count: 10 )
        end
      end
    end

    context 'with a duration having no start_date' do
      before(:each) do
        duration.update( starts_at: nil )
      end
      it 'shows all past periods as occupied'do
        visit forecasts_path(start_year: 2015, start_month: 1)
        within the('forecasts-list') do
          expect( page ).to have_css( ".occupation", text: "5", count: 6 )
        end
      end
    end

    context 'with overlapping durations' do
      before(:each) do
        duration
        duration2 = duration.dup
        duration2.update(starts_at: '2015-02-16', ends_at: '2015-05-01', quantifier: 2)
      end
      it 'shows the overlapping occupations'do
        visit forecasts_path(start_year: 2015, start_month: 1)
        within the('forecasts-list') do
          expect( page ).to have_css( ".occupation"        , text: "5"  , count: 4 )
          expect( page ).to have_css( ".occupation"        , text: "2"  , count: 5 )
          expect( page ).to have_xpath( "//td[*[@class='occupation']]", text: "5 2", count: 3 )
        end
      end
    end

    context 'with duration boundaries off from period boundaries' do
      before do
        duration.update(
            starts_at: '2015-02-01',
              ends_at: '2015-03-3',
           quantifier: 5
        )
      end
      it 'extrapolates the quantifier according to the partial occupation' do
        visit forecasts_path(start_year: 2015, start_month: 1)
        within the('forecasts-list') do
          expect( page ).to have_css( ".occupation", text: "5"  , count: 2 )
          expect( page ).to have_css( ".occupation", text: "0.7", count: 1 )
        end
      end
    end


  end

end
