require 'spec_helper'
require 'factories_spec_helper'
require 'view_context_spec_helper'
require 'html_fragment_spec_helper'
require 'purpose_selector_spec_helper'

describe GlobalViewPresenter do
  subject{ described_class.new(viewer: viewer, view_context: view_context) }
  let(:view_context){ view }

  context 'for a superuser' do
    let(:viewer){ create(:super_user) }

    describe 'rendering to html' do
      describe 'providing a global view' do
        it 'presents the people' do
          expect( fragment(subject.to_html) ).to have_the 'people-list'
        end
        it 'presents the projects' do
          expect( fragment(subject.to_html) ).to have_the 'people-list'
        end
      end
      describe 'exposing forms' do
        it 'exposes the form to add a person' do
          expect( fragment(subject.to_html) ).to have_css 'form.new_user'
        end
        it 'exposes the form to add a project' do
          expect( fragment(subject.to_html) ).to have_css 'form.new_project'
        end
      end
    end

  end

end
