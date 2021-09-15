require 'spec_helper'

describe Membership do

  describe 'attributes' do
    expect_it { to have_attribute('project_id') }
    expect_it { to have_attribute('user_id') }
    expect_it { to have_attribute('description') }
    expect_it { to respond_to('name') }
  end

  describe 'associations' do
    expect_it { to belong_to(:project) }
    expect_it { to belong_to(:user) }
  end

  describe 'validations' do
    expect_it { to validate_uniqueness_of(:project_id).scoped_to(:user_id) }
  end

end
