require 'test_helper'

class FrontendControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get frontend_home_url
    assert_response :success
  end

end
