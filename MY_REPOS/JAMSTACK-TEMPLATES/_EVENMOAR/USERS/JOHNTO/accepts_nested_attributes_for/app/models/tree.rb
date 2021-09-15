class Tree < ActiveRecord::Base
  belongs_to :forest

  validates_presence_of :common_name, :scientific_name
end
