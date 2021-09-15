class Journal
  def self.insert args
    Activity.create!(args) unless viewing_action?(args)
  end

  private

    def self.viewing_action?(args)
      args[:action].to_s.include?('viewed_')
    end

end

