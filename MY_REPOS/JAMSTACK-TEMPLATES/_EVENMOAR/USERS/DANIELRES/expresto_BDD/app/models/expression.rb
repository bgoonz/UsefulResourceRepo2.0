# encoding: utf-8
class Expression < ActiveRecord::Base

  extend FriendlyId
  friendly_id :body, use: :slugged

  acts_as_commentable

  before_save :clean_and_format_body
  validates :body, :meaning, :author_id,  :language_id, presence: true

#  SOURCE_TYPES = [:me, :someone, :fiction, :celebrity, :private_joke, :internet, :forgotten, :other]
#   validates_inclusion_of :source_type, in: SOURCE_TYPES
  AVATAR_TYPES = ['', :identicon, :monsterid, :wavatar, :retro]#, :mm ]
  belongs_to :author, class_name: 'User'
  belongs_to :language
  has_many :translations
  default_scope order('created_at DESC')
  scope :recent, lambda{ |qty=nil|order('created_at DESC').limit(qty) }
  scope :in,     lambda{ |locale| where(language_id: Language.find_by_code(locale).id) }

  def to_s
    body
  end
  def comments
    root_comments
  end
private

  def clean_and_format_body
    self.body = self.body.strip.squeeze(' ')
    self.body = self.body + '.' unless self.body.last == '.'
    self.body = self.body[0].upcase_international + self.body[1..-1]
  end



end
