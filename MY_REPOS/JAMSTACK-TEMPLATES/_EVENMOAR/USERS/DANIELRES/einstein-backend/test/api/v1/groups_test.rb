require "test_helper"

class APITest::GroupsTest < ActiveSupport::TestCase

    def app
      Rails.application
    end


    before { token_auth_with_user(@@test_user) }


    describe "POST /api/v1/groups" do
      describe "when required params are present" do
        it "returns an HTTP status 201 with the representation of the resource created" do
          post '/api/v1/groups', { name: 'My group', description: 'My description'}
          last_response.status.must_equal 201
          JSON.parse(last_response.body)['id'].must_be :present?
          JSON.parse(last_response.body)['name'].must_equal 'My group'
          JSON.parse(last_response.body)['description'].must_equal 'My description'
          JSON.parse(last_response.body)['discussions'].must_be_kind_of Enumerable
          JSON.parse(last_response.body)['discussions'].must_be_kind_of Enumerable
          JSON.parse(last_response.body)['created_at'].must_be :present?
          JSON.parse(last_response.body)['updated_at'].must_be :present?
        end
      end

      %w(name description).each do |param|
        describe "when param '#{param}' is missing" do
          it "returns an HTTP status 400 with a list of errors" do
            post '/api/v1/groups'
            last_response.status.must_equal 400
            JSON.parse(last_response.body)[param].must_be :present?
            last_response.body.must_include "can't be blank"
            last_response.body.must_include "is too short"
          end
        end
      end

    end


    describe "GET /api/v1/groups" do
      describe "when groups have been created" do
        before do
          post '/api/v1/groups', { name: 'My group 1', description: 'My description 1'}
          post '/api/v1/groups', { name: 'My group 2', description: 'My description 2'}
        end
        it "returns an HTTP status 201 with the representation of the resources created" do
          get '/api/v1/groups'
          last_response.status.must_equal 200
          JSON.parse(last_response.body).size.must_equal 2
          JSON.parse(last_response.body)[0]['id'].must_be :present?
          JSON.parse(last_response.body)[0]['name'].must_equal 'My group 1'
          JSON.parse(last_response.body)[0]['description'].must_equal 'My description 1'
          JSON.parse(last_response.body)[1]['id'].must_be :present?
          JSON.parse(last_response.body)[1]['name'].must_equal 'My group 2'
          JSON.parse(last_response.body)[1]['description'].must_equal 'My description 2'
        end
      end
    end


    describe "GET /api/v1/groups/:id" do
      describe "when a group has been created" do
        before do
          post '/api/v1/groups',  { name: 'My group', description: 'My description'}
        end
        it "returns an HTTP status 201 with the representation of the resource" do
          group_id = JSON.parse(last_response.body)['id']
          get "/api/v1/groups/#{group_id}"
          last_response.status.must_equal 200
          JSON.parse(last_response.body)['id'].must_equal group_id
          JSON.parse(last_response.body)['name'].must_equal 'My group'
          JSON.parse(last_response.body)['description'].must_equal 'My description'
          JSON.parse(last_response.body)['discussions'].must_be_kind_of Enumerable
          JSON.parse(last_response.body)['discussions'].must_be_kind_of Enumerable
          JSON.parse(last_response.body)['created_at'].must_be :present?
          JSON.parse(last_response.body)['updated_at'].must_be :present?
        end
      end
    end


  end
