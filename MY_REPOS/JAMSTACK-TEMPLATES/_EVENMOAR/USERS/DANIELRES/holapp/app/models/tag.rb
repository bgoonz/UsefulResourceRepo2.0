class Tag < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  has_many :taggings, dependent: :destroy
  has_many :taggings_as_taggable, as: :taggable, class_name: 'Tagging', foreign_key: 'taggable_id', dependent: :destroy

  def self.poles
    where(id: poles_ids)
  end

  def self.free
    where(id: tags_without_parents_ids - poles_ids)
  end


  def pole?
    children.any? && parents.none?
  end

  def children
    taggings
      .includes(:taggable)
      .where(taggable_type: 'Tag')
      .map(&:taggable)
  end

  def parents
    taggings_as_taggable
      .map(&:tag)
  end

  def descendants
    result = children
    children.each { |p| result.concat(p.descendants) }
    result
  end

  def ancestors
    result = parents
    parents.each { |p| result.concat(p.ancestors) }
    result
  end

  def to_s
    name
  end


  private

    def self.tags_with_children_ids
       Tagging.where(taggable_type: 'Tag').pluck(:tag_id).uniq
    end

    def self.all_tags_ids
      Tag.pluck(:id)
    end

    def self.tags_without_parents_ids
      all_tags_ids - tags_with_parents_ids
    end

    def self.tags_with_parents_ids
      Tagging.where(taggable_type: 'Tag', context: 'tag_parents').pluck(:taggable_id)
    end

    def self.poles_ids
      tags_without_parents_ids & tags_with_children_ids
    end


end
