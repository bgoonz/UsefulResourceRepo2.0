# encoding: utf-8
class News < ActiveRecord::Base
  belongs_to :author, class_name: 'User'
  default_scope order('published_at DESC')
  scope :published, lambda {where("published_at < ?", Time.now)}
  before_save :init_published_at

  def body(locale=:en)
    if (locale == :fr) && (body_fr.present?)
      body_fr
    else
      body_en
    end
  end

private

  def init_published_at
    if published_at.blank?
      self.published_at = created_at
    end
  end

end
