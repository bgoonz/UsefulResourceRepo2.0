class Fact
  include DataMapper::Resource
  property :id,             Serial
  property :start_time,     DateTime
  property :end_time,       DateTime
  property :description,    String
  belongs_to :activity

  def duration
    ( ( end_time.to_time - start_time.to_time ) /60 ).to_i
  end

end