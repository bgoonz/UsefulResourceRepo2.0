class Album < ActiveRecord::Base
  has_many :images

  def to_s
    title
  end

end
