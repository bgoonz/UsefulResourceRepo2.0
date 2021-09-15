class TagRepository

  def self.apply_tag_list_on(tag_list, taggable, tag_field)
    tag_list.split(',').each do |tag_name|
      tag = fetch_tag(tag_name)
      apply_tag_on(tag, taggable, tag_field)
    end
  end


  private

    def self.fetch_tag(tag_name)
      tag_name.strip!
      tag = Tag.where( "lower(name) = ?", tag_name.downcase).first
      tag ||= Tag.create(name: tag_name)
    end

    def self.apply_tag_on(tag, taggable, tag_field)
      tagging = Tagging.where(tag: tag, taggable: taggable, context: tag_field).first_or_initialize
      tagging.persisted? || tagging.save
    end

end
