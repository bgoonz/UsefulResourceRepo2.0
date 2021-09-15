class Timesheet
  def initialize activity, month
    @activity = activity
    @month    = month
  end

  def facts
    @activity.facts
             .select{ |f| f.start_time.year  == @month.year  }
             .select{ |f| f.start_time.month == @month.month }
             .sort_by(&:start_time)
  end

  def total_minutes_count
    total = 0
    facts.each{ |f| total += f.duration }
    total
  end

  def total_hours_count
     sprintf( "%.1f", Float( total_minutes_count ) / 60 ).to_f
  end

  def month
    @month.month
  end

  def year
    @month.year
  end

  def activity
    @activity
  end

end