class Article < ActiveRecord::Base

  acts_as_commentable

  belongs_to :author, :class_name => 'User'
  
  validates :body, :presence => true

  validates :status_code, :presence => true
  
  default_scope :order => "created_at DESC"
  
  scope :published, :conditions => { :status_code => 1 }
  

  
  def body
    BlueCloth.new(super).to_html.html_safe  
  end
  
  def intro
    body.split('<!--more-->')[0]
  end
  
  def status
    if    status_code == 0
      'draft'
    elsif status_code == 1
      'published'
    end
  end
  
  def to_s
    title
  end

  def to_param 
    "#{id}-#{to_s.truncate(150).parameterize}"
  end  
  
  
end
