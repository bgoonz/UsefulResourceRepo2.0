class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name

  # to many queries
  # has_many :rentals
end
