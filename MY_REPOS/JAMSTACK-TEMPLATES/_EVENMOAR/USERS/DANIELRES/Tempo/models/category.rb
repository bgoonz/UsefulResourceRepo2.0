class Category
  include DataMapper::Resource
  property :id,             Serial
  property :name,           String
  property :color_code,     String
  property :category_order, Integer
  property :search_name,    String
  has n, :activities
end