class BaseExhibit

  def initialize model, context, format
    @model   = model
    @context = context
    @format  = format.to_s || 'default'
  end

  private

    def template
      File.read "#{@context.settings.root}/views/exhibits/#{ self.class.to_s.downcase.gsub 'exhibit', '' }/#{format}.haml"
    end

    def format
      case @format
      when 'default' then @default_format
      else @format
      end
    end

end