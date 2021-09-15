require "test_helper"

describe DiscussionEntry do
  should validate_presence_of(:body)
  should validate_length_of(:body).is_at_least(1)
  should belong_to(:discussion)
  should belong_to(:author)
end
