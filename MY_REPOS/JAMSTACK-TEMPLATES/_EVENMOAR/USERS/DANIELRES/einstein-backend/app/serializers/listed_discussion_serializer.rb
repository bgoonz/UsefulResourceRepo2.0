class ListedDiscussionSerializer < ActiveModel::Serializer

  attributes :id, :title, :created_at, :updated_at
  has_one :author,  serializer: UserSerializer

end
