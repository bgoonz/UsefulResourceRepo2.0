class Membership < ActiveRecord::Base
  belongs_to :project
  belongs_to :user
  has_many :durations, as: :durable
  validates :project_id, uniqueness: { scope: :user_id }
  alias_attribute :person, :user

  def name
    "#{ project && project.name } - #{ user && user.name }"
  end

  def to_s
    name
  end
end
