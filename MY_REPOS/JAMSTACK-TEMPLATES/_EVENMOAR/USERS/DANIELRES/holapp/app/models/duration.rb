class Duration < ActiveRecord::Base
  belongs_to :durable, polymorphic: true


  def to_s
    name
  end

  def name
    "#{ durable && durable.name } #{ durable && durable.class.name.downcase } duration".strip
  end


  def starts_at
    self[:starts_at].presence || durable.try(:project).try(:starts_at)
  end

  def ends_at
    self[:ends_at  ].presence || durable.try(:project).try(:ends_at)
  end

  def starts_at_inherited?
    self[:starts_at].blank?
  end

  def ends_at_inherited?
    self[:ends_at].blank?
  end

end
