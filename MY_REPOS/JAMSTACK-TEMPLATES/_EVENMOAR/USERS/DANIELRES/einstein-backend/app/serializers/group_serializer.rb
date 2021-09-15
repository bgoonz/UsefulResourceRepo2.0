class GroupSerializer < ActiveModel::Serializer

  attributes :id, :name, :description, :members, :created_at, :updated_at

  has_many :discussions, serializer: ListedDiscussionSerializer


  def members
    [
      # { id: 1, name: 'Duivvv'      , avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg'         },
      # { id: 2, name: 'Ryan Johnson', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ryanjohnson_me/128.jpg' },
      # { id: 3, name: 'Duivv'       , avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg'         },
      # { id: 4, name: 'Duivvv'      , avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg'         },
      # { id: 5, name: 'Ryan Johnson', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ryanjohnson_me/128.jpg' },
      # { id: 6, name: 'Duivv'       , avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg'         },
    ]
  end


end
