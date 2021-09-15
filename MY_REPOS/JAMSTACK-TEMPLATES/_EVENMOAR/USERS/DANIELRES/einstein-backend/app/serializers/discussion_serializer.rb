class DiscussionSerializer < ActiveModel::Serializer

  attributes :id, :title, :entries
  has_one :author,  serializer: UserSerializer

  def entries
    object
      .discussion_entries
      .map do |entry|
        DiscussionEntrySerializer.new(entry, root: false)
      end
  end
end
