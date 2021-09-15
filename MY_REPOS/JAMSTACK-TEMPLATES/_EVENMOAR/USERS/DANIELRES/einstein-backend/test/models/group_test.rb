require "test_helper"

describe Group do
  should have_many(:discussions)

  should validate_presence_of(:name)
  should validate_length_of(:name).is_at_least(3)

  should validate_presence_of(:description)
  should validate_length_of(:description).is_at_least(3)
end
