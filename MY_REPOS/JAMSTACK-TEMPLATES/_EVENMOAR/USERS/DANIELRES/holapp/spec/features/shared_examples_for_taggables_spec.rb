shared_examples 'a taggable' do

    describe 'tagging', :slow, :js, driver: :selenium do
      describe 'adding taggings to a taggable' do
        before(:each) do
          visit polymorphic_path(taggable)
        end
        it 'adds the taggings to the taggable page' do
          within the("#{ tag_field }-adder") do
            fill_in 'tagging[tag_list]', with: 'tag1, tag2, '
            first('[type=submit]').click
          end
          visit polymorphic_path(taggable)
          expect( page ).to have_content('tag1')
          expect( page ).to have_content('tag2')
        end
      end
    end

end
