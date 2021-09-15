class TaggingRepository

  def self.by_taggable_and_tag_field(taggable, tag_field)
    taggings = Tagging.where(taggable_id: taggable.id, taggable_type: taggable.class.name, context: tag_field)
    nonull   = taggings.where("quantifier is not null").order(quantifier: :desc)
    yesnull  = taggings.where("quantifier is null")
    nonull + yesnull
  end

end
