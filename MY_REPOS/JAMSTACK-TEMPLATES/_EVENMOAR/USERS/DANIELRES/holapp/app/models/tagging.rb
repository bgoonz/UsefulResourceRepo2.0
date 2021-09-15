class EvilCycleValidator < ActiveModel::Validator
  def validate(record)
    if record.taggable_type == 'Tag' and record.tag.present? and ( [record.tag] + record.tag.ancestors ).include?(record.taggable)
      record.errors[:base] << 'Cannot create tag(s): a circular tagging was detected.'
    end
  end
end

class Tagging < ActiveRecord::Base
  belongs_to :tag
  belongs_to :taggable, polymorphic: true
  validates_with EvilCycleValidator, on: :create

  PROJECTS_TAG_FIELDS = [ :skills ]
  PEOPLE_TAG_FIELDS   = [ :skills, :motivations ]


  def to_s
    name
  end

  def name
    "#{ taggable_name } - #{ context }: #{ tag_name }"
  end

  def taggable_name
    taggable.try(:name) || 'undefined'
  end


  private

    def tag_name
      tag.try(:name) || 'undefined'
    end


end
