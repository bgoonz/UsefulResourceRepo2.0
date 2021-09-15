class Sharing < ActiveRecord::Base
  belongs_to :user
  validates_length_of :content, :minimum => 5
end
