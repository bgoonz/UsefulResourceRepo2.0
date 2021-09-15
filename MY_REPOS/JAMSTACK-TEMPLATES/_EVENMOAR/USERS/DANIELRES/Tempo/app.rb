require 'bundler'
Bundler.require

$: << File.expand_path( '../models'  , __FILE__ )
$: << File.expand_path( '../exhibits', __FILE__ )
$: << File.expand_path( '../engines' , __FILE__ )
$: << File.expand_path( '../helpers' , __FILE__ )

require 'activity'
require 'category'
require 'fact'
require 'tag'
require 'fact_exhibit'
require 'timesheet_exhibit'
require 'sass_engine'
require 'application_helpers'

class Tempo < Sinatra::Base


  DataMapper.setup(:default, "sqlite://#{Dir.pwd}/db/hamster.db")
  DataMapper.finalize

  use SassEngine

  helpers ApplicationHelpers

  get '/' do
    activities = Activity.all( order: [ :name ] )
    haml :home, locals: { activities: activities }, layout: :page_layout
  end

  get '/activity/:id' do
    activity   = Activity.get params[:id]
    timesheets = timesheets_from_activity activity
    timesheets = timesheets.map{ |timesheet| exhibit timesheet, format: 'table' }
    haml :activity, locals: { activity:   activity,
                              timesheets: timesheets,
                              page_title: "Timesheets for #{ activity.name.capitalize }",
                            },
                            layout: :page_layout
  end

  private


end