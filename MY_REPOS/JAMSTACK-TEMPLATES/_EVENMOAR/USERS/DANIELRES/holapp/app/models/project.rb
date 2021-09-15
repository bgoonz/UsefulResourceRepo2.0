class Project < ActiveRecord::Base

  self.inheritance_column = "disabled"

  default_scope { order('name') }

  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }

  has_many :memberships, dependent: :destroy
  has_many :taggings, as: :taggable, dependent: :destroy

  has_many :members, through: :memberships, source: :user

  def to_s
    name
  end

  def type
    case self[:type]
    when 0 then nil
    when 1 then :internal
    when 2 then :external
    end
  end

end
