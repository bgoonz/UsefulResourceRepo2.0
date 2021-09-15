require 'spec_helper'

describe User do

  before(:each) do
    @attr = {
      :name => "Example User",
      :email => "user@example.com",
      :password => "changeme",
      :password_confirmation => "changeme"
    }
  end

  describe 'attributes' do
    expect_it { to respond_to('name') }
    expect_it { to have_attribute('display_name') }
    expect_it { to have_attribute('first_name') }
    expect_it { to have_attribute('last_name') }
    expect_it { to have_attribute('description') }
    expect_it { to have_attribute('trigram') }
    expect_it { to have_attribute('mobile') }
    expect_it { to have_attribute('cv_url') }
  end

  describe "appearing or not in common lists" do
    describe "scope 'listable'" do
      let!(:listable_person) { FactoryGirl.create(:listable_person) }
      it 'returns only people who are listable' do
        expect(User.listable).to match_array [listable_person]
      end
    end
    expect_it { to respond_to('listable?') }
    describe "class-level override for #listable?" do
      describe "User.list_all?" do
        it 'is disabled by default' do
          expect( User.list_all? ).to be_false
        end
        it 'can be enabled / disabled' do
          User.enable_list_all!
          expect( User.list_all? ).to be_true
          User.disable_list_all!
          expect( User.list_all? ).to be_false
        end
      end
    end
  end

  describe 'quick creation' do
    it 'extract the firstname and last name from single name field' do
      user = User.create!(name: 'Jean de Dupont', email: 'anything@anything.com', password: 'anything')
      expect( user.first_name ).to eq 'Jean'
      expect( user.last_name ).to eq 'de Dupont'
    end
  end

  describe 'returning a name to display' do
    context 'when name is not set' do
      it 'returns the value of first_name' do
        user = User.create!(name: 'Jean de Dupont', email: 'anything@anything.com', password: 'anything')
        expect( user.name ).to eq 'Jean'
      end
    end
    context 'when display_name is set' do
      it 'returns the value of name' do
        user = User.create!(name: 'Jean de Dupont', email: 'anything@anything.com', password: 'anything')
        user.display_name = 'Tonton'
        expect( user.name ).to eq 'Tonton'
      end
    end
    context 'when display_name is blank' do
      it 'returns the value of first_name' do
        user = User.create!(name: 'Jean de Dupont', email: 'anything@anything.com', password: 'anything')
        user.display_name = ''
        expect( user.name ).to eq 'Jean'
        user.display_name = nil
        expect( user.name ).to eq 'Jean'
      end
    end
  end

  describe 'validations' do
    expect_it { to validate_presence_of(:first_name) }
    expect_it { to validate_uniqueness_of(:first_name).scoped_to(:last_name).case_insensitive }
    expect_it { to validate_presence_of(:email) }
    expect_it { to validate_uniqueness_of(:email) }
  end

  it "should create a new instance given valid attributes" do
    User.create!(@attr)
  end

  it "should accept valid email addresses" do
    addresses = %w[user@foo.com THE_USER@foo.bar.org first.last@foo.jp]
    addresses.each do |address|
      valid_email_user = User.new(@attr.merge(:email => address))
      valid_email_user.should be_valid
    end
  end

  it "should reject invalid email addresses" do
    addresses = %w[user@foo,com user_at_foo.org example.user@foo.]
    addresses.each do |address|
      invalid_email_user = User.new(@attr.merge(:email => address))
      invalid_email_user.should_not be_valid
    end
  end

  it "should reject duplicate email addresses" do
    User.create!(@attr)
    user_with_duplicate_email = User.new(@attr)
    user_with_duplicate_email.should_not be_valid
  end

  it "should reject email addresses identical up to case" do
    upcased_email = @attr[:email].upcase
    User.create!(@attr.merge(:email => upcased_email))
    user_with_duplicate_email = User.new(@attr)
    user_with_duplicate_email.should_not be_valid
  end

  describe "passwords" do

    before(:each) do
      @user = User.new(@attr)
    end

    it "should have a password attribute" do
      @user.should respond_to(:password)
    end

    it "should have a password confirmation attribute" do
      @user.should respond_to(:password_confirmation)
    end
  end

  describe "password validations" do

    it "should require a password" do
      User.new(@attr.merge(:password => "", :password_confirmation => "")).
        should_not be_valid
    end

    it "should require a matching password confirmation" do
      User.new(@attr.merge(:password_confirmation => "invalid")).
        should_not be_valid
    end

    it "should reject short passwords" do
      short = "a" * 5
      hash = @attr.merge(:password => short, :password_confirmation => short)
      User.new(hash).should_not be_valid
    end

  end

  describe "password encryption" do

    before(:each) do
      @user = User.create!(@attr)
    end

    it "should have an encrypted password attribute" do
      @user.should respond_to(:encrypted_password)
    end

    it "should set the encrypted password attribute" do
      @user.encrypted_password.should_not be_blank
    end

  end

end
