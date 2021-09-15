class TextEvaluator

  def evaluate input = "", options = {}
    separator = options.delete( :separator ) || ' '
    context   = options.delete( :context   ) || BasicObject
    locals    = options
    text      = make_string_of input, separator
    locals.each{ |k,v| context.define_singleton_method(k){ v } }
    context.instance_eval '"' + text + '"'
  end

  private

    def make_string_of input, separator
      Array( input ).join(separator) || ''
    end

end