SHOWDOWN_JS = File.read( Rails.root.join("vendor/assets/javascripts/showdown.js") )

class MarkdownRenderer

  def call(string)
    execution_context.call(converter_js, string.to_s).html_safe
  end

  private

    def execution_context
      ExecJS.compile(SHOWDOWN_JS)
    end

    def converter_js
      " run = function(text){
          return new Showdown.converter().makeHtml(text);
        };
      "
    end

end
