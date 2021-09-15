module Chartable
  def self.bar(data, opts = {})
    opts[:height] = opts[:height] || 150
    opts[:width] = opts[:width] || 300
    opts[:count] = data.length

    opts[:bar_width] = 2 * (opts[:width] / (data.length * 3 + 1))

    <<-HTML
      <svg
        viewBox="0 0 #{opts[:width]} #{opts[:height]}"
        width="#{opts[:width]}"
        height="#{opts[:height]}"
        fill="currentcolor"
        style="border-bottom: #{opts[:x_axis] || :none}; border-left: #{opts[:y_axis] || :none}">
        #{bars(data, opts).join}
      </svg>
    HTML
  end

  def self.bars(data, opts)
    data.map do |bar|
      <<-HTML
        <path fill="currentcolor" d="#{bar_path(bar, opts)}" />
      HTML
    end
  end

  def self.bar_path(bar, opts)
    height = (bar[:y] * opts[:height]) / 50
    chart_offset = opts[:bar_width] / 2
    x_offset = opts[:bar_width] * 1.5 * bar[:x]

    "M #{chart_offset + x_offset} #{opts[:height]} v#{-height} h#{opts[:bar_width]} v#{height}z"
  end
end
