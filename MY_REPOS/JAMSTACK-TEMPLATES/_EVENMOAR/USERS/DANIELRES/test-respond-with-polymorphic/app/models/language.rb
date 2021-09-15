class Language < ActiveRecord::Base
  attr_accessible :code, :english_name, :native_name

  validates :code, :english_name, :native_name, :presence => true

  has_many :projects
  has_many :tags

  def to_s
    english_name
  end

end
