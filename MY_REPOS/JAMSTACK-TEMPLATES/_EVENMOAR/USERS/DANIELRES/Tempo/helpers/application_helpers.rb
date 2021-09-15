require 'timesheet'

module ApplicationHelpers

  def main_page_path        ; '/'                        end
  def activity_path activity; "/activity/#{activity.id}" end

  def timesheets_from_activity activity
    activity.months.reverse.map{ |month| Timesheet.new activity, month }
  end
  def the name
    { data: { purpose: name } }
  end
  def exhibit object, options={}
    context = options[:context] || self
    format  = options.fetch( :format )
    case object
      when Timesheet then TimesheetExhibit.new( object, context, format )
      when Fact      then      FactExhibit.new( object, context, format )
    end.to_html
  end
  def stylesheet_link name
    haml "%link{ rel: 'stylesheet', type: 'text/css', href: '/stylesheets/#{name}.css' }"
  end

end