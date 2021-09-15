require "test_helper"

class APITest::GroupsTest < ActiveSupport::TestCase

  def app
    Rails.application
  end


  before { token_auth_with_user(@@test_user) }

  describe "when the discutable is a group" do
    before do
      post '/api/v1/groups', { name: 'My group', description: 'My description'}
    end
    let(:group_id){ JSON.parse(last_response.body)['id'] }

    describe "POST /api/v1/groups/:group_id/discussions" do
      describe "when required params are present" do
        it "returns an HTTP status 201 with the representation of the resource created" do
          post "/api/v1/groups/#{group_id}/discussions", { title: 'My discussion' }
          last_response.status.must_equal 201
          JSON.parse(last_response.body)['id'].must_be :present?
          JSON.parse(last_response.body)['title'].must_equal 'My discussion'
          JSON.parse(last_response.body)['discutable_id'].must_equal group_id
          JSON.parse(last_response.body)['discutable_type'].must_equal 'Group'
        end
      end
    end

    %w(title).each do |param|
      describe "when param '#{param}' is missing" do
        it "returns an HTTP status 400 with a list of errors" do
          post "/api/v1/groups/#{group_id}/discussions"
          last_response.status.must_equal 400
          JSON.parse(last_response.body)[param].must_be :present?
          last_response.body.must_include "can't be blank"
          last_response.body.must_include "is too short"
        end
      end
    end

    describe "GET /api/v1/groups/:group_id/discussions/:id" do
      describe "when a discussion has been created" do
        before do
          post "/api/v1/groups/#{group_id}/discussions", { title: 'My discussion' }
        end
        let(:discussion_id){ JSON.parse(last_response.body)['id'] }
        it "returns an HTTP status 201 with the representation of the resource" do
          get "/api/v1/groups/#{group_id}/discussions/#{discussion_id}"
          last_response.status.must_equal 200
          JSON.parse(last_response.body)['id'].must_equal discussion_id
          JSON.parse(last_response.body)['title'].must_equal 'My discussion'
          JSON.parse(last_response.body)['author']['id'].must_be :present?
          JSON.parse(last_response.body)['author']['username'].must_equal "Testuser"
          JSON.parse(last_response.body)['author']['email'].must_equal "testuser@test.com"
        end

        describe "when the discussion has entries" do
          before do
            post "/api/v1/groups/#{group_id}/discussions/#{discussion_id}/entries", { body: 'My entry 1' }
            post "/api/v1/groups/#{group_id}/discussions/#{discussion_id}/entries", { body: 'My entry 2' }
          end
          it "shows the discussion entries in the representation of the resource" do
            get "/api/v1/groups/#{group_id}/discussions/#{discussion_id}"
            JSON.parse(last_response.body)['entries'][0]['body'].must_equal 'My entry 1'
            JSON.parse(last_response.body)['entries'][0]['author']['id'].must_be :present?
            JSON.parse(last_response.body)['entries'][0]['author']['username'].must_equal "Testuser"
            JSON.parse(last_response.body)['entries'][0]['author']['email'].must_equal "testuser@test.com"
            JSON.parse(last_response.body)['entries'][1]['body'].must_equal 'My entry 2'
            JSON.parse(last_response.body)['entries'][1]['author']['id'].must_be :present?
            JSON.parse(last_response.body)['entries'][1]['author']['username'].must_equal "Testuser"
            JSON.parse(last_response.body)['entries'][1]['author']['email'].must_equal "testuser@test.com"
          end
        end
      end
    end

    describe "POST /api/v1/groups/:group_id/discussions/:discussion_id/entries" do
      describe "when a discussion has been created" do
        before do
          post "/api/v1/groups/#{group_id}/discussions", { title: 'My discussion' }
        end
        let(:discussion_id){ JSON.parse(last_response.body)['id'] }
        describe "when required params are present" do
          it "returns an HTTP status 201 with the representation of the resource created" do
            post "/api/v1/groups/#{group_id}/discussions/#{discussion_id}/entries", { body: 'My entry' }
            last_response.status.must_equal 201
            JSON.parse(last_response.body)['id'].must_be :present?
            JSON.parse(last_response.body)['body'].must_equal 'My entry'
            JSON.parse(last_response.body)['discussion_id'].must_equal discussion_id
          end
        end
      end
    end
  end
end
