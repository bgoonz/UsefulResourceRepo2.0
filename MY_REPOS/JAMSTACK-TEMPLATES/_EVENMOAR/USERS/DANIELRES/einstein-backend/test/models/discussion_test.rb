require "test_helper"

describe Discussion do
  should validate_presence_of(:title)
  should validate_length_of(:title).is_at_least(3)
  should belong_to(:author)
  should belong_to(:discutable)
  should have_many(:discussion_entries)
end
