require 'test_helper'

class TreesControllerTest < ActionController::TestCase
  setup do
    @tree = trees(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:trees)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tree" do
    assert_difference('Tree.count') do
      post :create, tree: { common_name: @tree.common_name, forest_id: @tree.forest_id, scientific_name: @tree.scientific_name }
    end

    assert_redirected_to tree_path(assigns(:tree))
  end

  test "should show tree" do
    get :show, id: @tree
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tree
    assert_response :success
  end

  test "should update tree" do
    patch :update, id: @tree, tree: { common_name: @tree.common_name, forest_id: @tree.forest_id, scientific_name: @tree.scientific_name }
    assert_redirected_to tree_path(assigns(:tree))
  end

  test "should destroy tree" do
    assert_difference('Tree.count', -1) do
      delete :destroy, id: @tree
    end

    assert_redirected_to trees_path
  end
end
