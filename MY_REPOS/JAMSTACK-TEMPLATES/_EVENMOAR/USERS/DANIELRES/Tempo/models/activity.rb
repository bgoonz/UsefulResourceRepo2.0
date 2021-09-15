class Activity
  include DataMapper::Resource
  property :id,             Serial
  property :name,           String
  property :work,           Integer
  property :activity_order, Integer
  property :deleted,        Integer
  property :category_id,    Integer
  property :search_name,    String
  belongs_to :category
  has n, :facts

  def months
    facts.map{ |f| f.start_time.strftime('%Y-%m') }
         .uniq
         .map{ |year_month|
            year, month = year_month.split('-').map(&:to_i)
            DateTime.new(year, month)
          }
  end

end