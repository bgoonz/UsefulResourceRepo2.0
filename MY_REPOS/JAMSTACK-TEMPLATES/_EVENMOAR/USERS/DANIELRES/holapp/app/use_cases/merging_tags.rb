class MergingTags

  include IsAnAdvancedCallable
  include SetsAViewContext
  include PresentsAForm

  def initialize(user, master_tag, slave_tag)
    @user       = user
    @master_tag = master_tag
    @slave_tag  = slave_tag
    @master_tag.extend MasterTag
  end

  def get_user_input()
    mergable_tags = ( Tag.all - [@master_tag] ).sort_by(&:name)
    present_form(mergable_tags: mergable_tags)
  end


  private

    def authorized?
      Ability.new(@user).can?(:manage, @master_tag) && Ability.new(@user).can?(:manage, @slave_tag)
    end

    def execution
      @master_tag.absorb(@slave_tag)
    end

    def journal_event
      {
        user:    @user,
        action:  :merged_tags,
        object:  @master_tag,
        details: { object_name: @master_tag.name, slave_name: @slave_tag.name },
      }
    end

    module MasterTag
      def absorb(slave_tag)
        transfer_taggings_as_tag(slave_tag)
        transfer_taggings_as_taggable(slave_tag)
        merge_tags_descriptions(slave_tag)
        slave_tag.destroy!
      end
      private
        def transfer_taggings_as_tag(slave_tag)
          taggings = Tagging.where( tag: slave_tag )
          taggings.each do |t|
            t.tag = self
            t.save!
          end
        end
        def transfer_taggings_as_taggable(slave_tag)
          taggings = Tagging.where( taggable: slave_tag )
          taggings.each do |t|
            t.taggable = self
            t.save!
          end
        end
        def merge_tags_descriptions(slave_tag)
          merged_description = [ self.description, slave_tag.description ].join("\n----\n")
          self.update_attributes(description: merged_description)
        end
    end

end
