class FrontendController < ApplicationController
  BOARD_WIDTH = 5
  BOARD_HEIGHT = 5

  def home
    @width = BOARD_WIDTH
    @height = BOARD_HEIGHT
  end
end
