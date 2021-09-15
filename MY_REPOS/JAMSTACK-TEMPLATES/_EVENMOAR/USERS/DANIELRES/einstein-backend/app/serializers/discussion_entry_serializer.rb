class DiscussionEntrySerializer < ActiveModel::Serializer

  attributes :id, :body
  has_one :author,  serializer: UserSerializer

end
