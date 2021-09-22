class Portfolio < ApplicationRecord
  validates_presence_of :title, :body
  has_many :technologies
  accepts_nested_attributes_for :technologies,
                                 allow_destroy: true,
                                 reject_if: lambda { |attr| attr['name'].blank? }

  mount_uploader :thumb_image, PortfolioUploader
  mount_uploader :main_image, PortfolioUploader


  def self.angular
    where(title: "Angular")
  end

  def self.byPosition
    order("position ASC")
  end

  scope :ruby_on_rails_portfolio_items, -> { where(title: "Ruby on Rails") }
end
