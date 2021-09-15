class BasePresenter

  def initialize context, model = nil
    @context = context
    @model   = model
  end

  private

    def locale                    ;  @context.params[:locale]             end
    def locale_name               ;  Language.find_by_code( locale ).name end
    def t           *args, &block ;  @context.t *args, &block             end

    def render      *args         ;  @context.render *args                end
    def content_tag *args, &block ;  @context.content_tag *args, &block   end

    def ul          *args, &block ;  content_tag :ul,   yield, *args       end
    def li          *args, &block ;  content_tag :li,   yield, *args       end
    def h2          *args, &block ;  content_tag :h2,   yield, *args       end
    def h3          *args, &block ;  content_tag :h3,   yield, *args       end
    def div         *args, &block ;  content_tag :div,  yield, *args       end
    def span        *args, &block ;  content_tag :span, yield, *args       end
    def search_icon               ;  @context.icon :search                end
    def icon_comment              ;  @context.icon :comment                end

    def row css_class = nil, &block
      div( class: [ 'row', css_class ] ){ yield }
    end

    def column title, css_class, &block
      div class: css_class do
        h3{ title } + yield
      end
    end

    def todo *args, &block
      @context.todo( *args ){ yield }
    end

    def h
      @context
    end

end

