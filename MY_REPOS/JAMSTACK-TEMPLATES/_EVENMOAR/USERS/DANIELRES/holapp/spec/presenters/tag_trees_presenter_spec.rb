require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe TagTreesPresenter do

  describe 'rendering to html' do


    let(:view_context){ view }

    context 'with tags organised in herarchies' do
      let(:food  ){ create(:tag, name: 'food') }
      let(:snack ){ create(:tag, name: 'snack') }
      let(:burger){ create(:tag, name: 'burger') }
      let(:fruit ){ create(:tag, name: 'fruit') }
      let(:apple ){ create(:tag, name: 'apple') }
      let(:round ){ create(:tag, name: 'round') }
      before(:each) do
        Tagging.create( tag: food,  taggable: snack,  context: 'parents' )
        Tagging.create( tag: snack, taggable: burger, context: 'parents' )
        Tagging.create( tag: snack, taggable: apple,  context: 'parents' )
        Tagging.create( tag: food,  taggable: fruit,  context: 'parents' )
        Tagging.create( tag: fruit, taggable: apple,  context: 'parents' )
        Tagging.create( tag: round, taggable: apple,  context: 'parents' )
      end

      describe 'from a pole' do
        it 'displays the pole with all its descendants' do
          food_tree = described_class.new(tag: food, view_context: view, viewer_taggings: [] ).to_html
          #  **food**
          #       snack
          #           burger
          #           apple
          #       fruit
          #           apple
          expect( fragment(food_tree) ).to have_css 'ul>li>strong>u>a',    text: 'food'
          expect( fragment(food_tree) ).to have_css 'ul>li>ul>li>a',       text: 'snack'
          expect( fragment(food_tree) ).to have_css 'ul>li>ul>li>ul>li>a', text: 'burger'
          expect( fragment(food_tree) ).to have_css 'ul>li>ul>li>a',       text: 'fruit'
          expect( fragment(food_tree) ).to have_css 'ul>li>ul>li>ul>li>a', text: 'apple', count: 2
          expect( fragment(food_tree) ).not_to have_content 'round'
        end
      end
      describe 'from a tag with multiple parents' do
        it 'presents the multiple trees' do
          apple_tree = described_class.new(tag: apple, view_context: view, viewer_taggings: [] ).to_html
          # food
          #     snack
          #         burger
          #         **apple**
          #     fruit
          #         **apple**
          # round
          #     **apple**
          expect( fragment(apple_tree) ).to have_css 'ul>li>a'                     , text: 'food'
          expect( fragment(apple_tree) ).to have_css 'ul>li>ul>li>a'               , text: 'snack'
          expect( fragment(apple_tree) ).to have_css 'ul>li>ul>li>ul>li>a'         , text: 'burger'
          expect( fragment(apple_tree) ).to have_css 'ul>li>ul>li>ul>li>strong>u>a', text: 'apple', count: 2
          expect( fragment(apple_tree) ).to have_css 'ul>li>ul>li>a'               , text: 'fruit'
          expect( fragment(apple_tree) ).to have_css 'ul>li>a'                     , text: 'food'
          expect( fragment(apple_tree) ).to have_css 'ul>li>ul>li>strong>u>a'      , text: 'apple'
        end
      end

    end

  end

end
