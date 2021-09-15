require 'base_exhibit'

class FactExhibit < BaseExhibit

  def initialize *args
    super
    @default_format = 'table_row'
  end

  def to_html
   @context.haml template, locals:  { day:         @model.start_time.strftime( '%a %d' ),
                                      duration:    @model.duration,
                                      start_time:  format_time( @model.start_time  ),
                                      end_time:    format_time( @model.end_time    ),
                                      description: break_lines( @model.description ),
                                    }
  end

  private

    def break_lines text
      text.to_s.gsub("\n",'<br />')
    end

    def format_time time
      "#{ '%02d' %  time.hour }:#{ '%02d' % time.minute }"
    end

end