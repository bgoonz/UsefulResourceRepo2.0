module News


  class Fetcher

    def initialize(user, filter, created_after = nil)
      @user   = user
      @filter = filter
      @created_after = created_after || DateTime.new(2000)
    end


    def call
      case @filter
      when 'interesting' then interesting
      else all
      end
    end


    private

      def interesting
        ( user_motivations + user_sub_motivations )
          .map{|tag| tag.taggings }.flatten.uniq
          .select{|t| t.taggable_type == 'News::Item'}
          .map(&:taggable)
          .select{ |item| item.created_at > @created_after }
          .uniq
      end

      def all
        Item.where("created_at > :created_after", { created_after: @created_after } ).order('created_at DESC')
      end

      def user_motivations
        @user.taggings
          .includes(:tag)
          .where(context: 'motivations')
          .map(&:tag)
      end

      def user_sub_motivations
         user_motivations
          .map(&:descendants)
          .flatten.uniq
      end


  end
end
