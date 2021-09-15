require 'base_exhibit'

class TimesheetExhibit < BaseExhibit

  def initialize *args
    super
    @default_format = 'table'
  end

  def to_html
    @context.haml template, locals: { timesheet:           @model,
                                      facts:               facts_html,
                                      total_hours_count:   @model.total_hours_count,
                                      total_minutes_count: @model.total_minutes_count,
                                      column_names:        [ 'day', 'description', 'start time', 'end time', 'minutes' ],
                                      timesheet_title:     timesheet_title,
                                    }
  end

  private

    def timesheet_title
      "Timesheet for #{ @model.year }-#{ "%02d" % @model.month } (#{@model.activity.name.capitalize})"
    end

    def facts_html
      @model.facts.map{ |fact| FactExhibit.new( fact, @context, 'table_row' ).to_html }.join
    end

end