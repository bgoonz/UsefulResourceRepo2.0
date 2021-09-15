module ApplicationHelper
  alias_method :method_missing_without_easy_partials, :method_missing

  def method_missing_with_easy_partials(method_name, *args, &block)
    method_str = method_name.to_s

    if method_str =~ /^_.+$/
      partial_name = method_str[/^_(.+)$/, 1]

      begin
        concat_partial partial_name, *args, &block
      rescue ActionView::MissingTemplate
        partial_name = "shared/#{partial_name}"
        concat_partial partial_name, *args, &block
      end
    else
      method_missing_without_easy_partials method_name, *args, &block
    end
  end

  alias_method :method_missing, :method_missing_with_easy_partials

  # Concat the given partial.
  def concat_partial(partial_name, options = {}, &block)
    unless block.nil?
      options.merge! :body => capture(&block)
    end

    content = render :partial => partial_name, :locals => options
    concat content
    nil
  end
end
