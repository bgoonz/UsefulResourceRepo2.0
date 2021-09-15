class Speaker < ActiveRecord::Base
  has_and_belongs_to_many :events

  acts_as_indexed :fields => [:firstname, :lastname, :description]

  validates :firstname, :presence => true

  belongs_to :image

  def to_s
    [ firstname , lastname ] * ' '
  end

end
