class News::Item < ActiveRecord::Base

  before_save :preprocess_contents

  LANGUAGES = %w(fr nl en)
  validates_presence_of  :summary
  validates_presence_of  :language
  validates_inclusion_of :language, in: LANGUAGES

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
  has_many :taggings, as: :taggable, dependent: :destroy

  def name; summary end
  def to_s; name    end


  private

    def preprocess_contents
      if new_record?
        self.summary = MdLinker.new(summary        ).call
        self.body    = MdLinker.new(body, link_text).call
      end
    end

    def link_text
      case language
      when 'fr' then 'Lire la suite'
      when 'nl' then 'Lees verder'
      else 'Read more'
      end
    end

end
