class Language < ActiveRecord::Base
  validates :code, :name, presence: true
  has_many :expressions

  validates :code, :name, uniqueness: true

  def to_s
    code
  end

end
