class HomepagePresenter < BasePresenter

  def to_html
    div class: 'homepage' do
      row do
        column( expressions_title, 'expressions column' ){ expressions_panel } +
        column( news_title       , 'news column'        ){ news_panel        } +
        column( comments_title   , 'comments column'    ){ comments_panel    }
      end
   end
  end

  private

    def expressions ; Expression.in( locale ).recent 10  end
    def news        ; News.published                     end
    def comments    ; Comment.recent 10                  end


    def expressions_title
     t( 'recent_expressions_in',
        language: t(locale_name),
        default: "Recent expressions in #{locale_name}"
      ).capitalize
    end

    def news_title
      t 'pages.home.news.title',
        default: 'Latest news'
    end

    def comments_title
      t '.comments',
        default: 'Recent comments'
    end

    def expressions_panel
      return "There are no expressions yet" unless expressions.any?
      ul class: 'expressions' do
        expressions.map do |expression|
          ExpressionPresenter.new( @context, expression ).to_html :list_item
        end.join.html_safe + li { expressions_link }
      end
    end

    def news_panel
      ul class: 'unstyled' do
        render collection: news, partial: 'homepage_presenter/news_item'
      end
    end

    def comments_panel
      ul class: %w( unstyled secundary-text ) do
        render comments, state: :list_item
      end
    end

    def expressions_link
      path      = @context.expressions_path
      css_class = 'btn btn-primary'
      text      = t :all_expressions_in, language: t( locale_name )
      @context.link_to path, class: css_class, data: { purpose: 'expressions-index' } do
        search_icon + text
      end
    end

end

