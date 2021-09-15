describe Activity do

  describe 'associations' do
    expect_it { to belong_to(:user) }
    expect_it { to belong_to(:object) }
  end

end
