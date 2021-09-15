require 'spec_helper'

describe 'Rendering a monthly forecast to json' do
  let!(:membership1){ FactoryGirl.build(:membership) }
  let!(:membership2){ FactoryGirl.build(:membership) }
  let!(:duration) do
    Duration.create(
          durable: membership1,
        starts_at: '2015-02-01',
          ends_at: '2015-03-15',
       quantifier: 4,
    )
    Duration.create(
          durable: membership2,
        starts_at: '2015-02-01',
          ends_at: '2015-02-15',
       quantifier: 4,
    )
  end
  before do
    forecast = Forecasts::Forecast.new(
      starting_from_month: Date.new(2015, 01),
                   months: 5,
              periodicity: 'monthly'
    )
    assign :forecast, forecast
    assign :people, [membership1.user, membership2.user]
    render template: 'forecasts/forecasts/index.json'
  end

  it 'renders the JSON properly' do
    expect(
      JSON.parse(rendered)
    ).to eq(
      {
        "forecast"=>{
          "description"=>{
            "starting_from_month"=>"2015-01-01",
            "months"=>5,
            "periodicity"=>"monthly"
          },
          "occupations"=>[
            { membership1.user.name => [ { membership1.project.name => [0,   4, 1.9, 0, 0] } ] },
            { membership2.user.name => [ { membership2.project.name => [0, 2.1,   0, 0, 0] } ] }
          ]
        }
      }
    )
  end
end
