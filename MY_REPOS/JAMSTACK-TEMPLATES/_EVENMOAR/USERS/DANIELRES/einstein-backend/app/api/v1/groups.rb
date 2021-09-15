module V1
  class Groups < Grape::API

    resource :groups do

      desc 'Creates a new group.'
      post do
        AddingAGroup
          .new(current_user)
          .call(
            params,
            success: ->(resource){ GroupSerializer.new(resource, root: false) },
            failure: ->(resource){ status 400; resource.errors },
          )
      end


      desc 'Returns a group by id.'
      get '/:id' do
        ViewingAGroup
          .new(current_user)
          .call(
            params[:id],
            success: ->(resource){ GroupSerializer.new(resource, root: false) },
            failure: ->(resource){ status 404 },
          )

      end

      desc 'Returns a list of groups.'
      get do
        ViewingGroups
          .new(current_user)
          .call
      end

      route_param :discutable_id do
        desc 'Returns a discussion by id from a group'
        get 'discussions/:discussion_id' do
          ViewingADiscussion
            .new(current_user)
            .call(
              params[:discussion_id],
              success: ->(resource){ DiscussionSerializer.new(resource, root: false) },
              failure: ->(resource){ status 404 },
            )
        end

        desc 'Creates a new discussion in a group'
        post 'discussions' do
          group = Group.find(params.delete(:discutable_id))
          AddingADiscussion
            .new(current_user, discutable: group)
            .call(
              params,
              success: ->(resource){ resource },
              failure: ->(resource){ status 400; resource.errors },
            )
        end

        desc 'Creates a new entry in a group discussion'
        post 'discussions/:discussion_id/entries' do
          discussion = Discussion.find(params.delete(:discussion_id))
          AddingADiscussionEntry
            .new(current_user, discussion: discussion)
            .call(
              params,
              success: ->(resource){ DiscussionEntrySerializer.new(resource, root: false) },
              failure: ->(resource){ status 400; resource.errors },
            )
        end
      end


    end

  end
end
