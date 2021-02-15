class FrontendController < ApplicationController
  BOARD_WIDTH = 5
  BOARD_HEIGHT = 5
  DIRECTIONS = ["north", "east", "south", 'west'];

  def home
    @width = BOARD_WIDTH
    @height = BOARD_HEIGHT
  end

  def move
    # logger.debug('@brand.inspect')
    data = params[:data]
    x_cor = data[0]
    y_cor = data[1]
    direction = data[2]

    if (direction == 'north')
      y_cor = y_cor.to_f + 1;
    elsif (direction == 'south')
      y_cor = y_cor.to_f - 1;
    elsif (direction == 'east')
      x_cor = x_cor.to_f + 1
    elsif (direction == 'west')
      x_cor = x_cor.to_f - 1
    end

    if valid_move(x_cor, y_cor, direction)
      render json: {"status": "success", "position": {
        'x_cor': x_cor,
        'y_cor': y_cor,
        'direction': direction
        }
      }
    else
      render json: {"status": "error", "message": "invalid move"}
    end

  end

  def place_robot
    data = params[:data]
    x_cor = data[0]
    y_cor = data[1]
    direction = data[2]

    if valid_move(x_cor, y_cor, direction)
      render json: {"status": "success", "position": {
        'x_cor': x_cor,
        'y_cor': y_cor,
        'direction': direction
        }
      }
    else
      render json: {"status": "error", "message": "invalid move"}
    end
  end

  def turn_left
    data = params[:data]
    x_cor = data[0]
    y_cor = data[1]
    direction = data[2]
    new_direction_index =  DIRECTIONS.index(direction) - 1;
    if new_direction_index < 0
      new_direction_index = DIRECTIONS.length() - 1;
    end

    if valid_move(x_cor, y_cor, DIRECTIONS[new_direction_index])
      render json: {"status": "success", "position": {
        'x_cor': x_cor,
        'y_cor': y_cor,
        'direction': DIRECTIONS[new_direction_index]
        }
      }
    else
      render json: {"status": "error", "message": "invalid move"}
    end
  end

  def turn_right
    data = params[:data]
    x_cor = data[0]
    y_cor = data[1]
    direction = data[2]
    new_direction_index =  DIRECTIONS.index(direction) + 1;

    if new_direction_index == DIRECTIONS.length()
      new_direction_index = 0;
    end

    if valid_move(x_cor, y_cor, DIRECTIONS[new_direction_index])
      render json: {"status": "success", "position": {
        'x_cor': x_cor,
        'y_cor': y_cor,
        'direction': DIRECTIONS[new_direction_index]
        }
      }
    else
      render json: {"status": "error", "message": "invalid move"}
    end
  end

  private

  def valid_move(x_cor, y_cor, direction)
    return x_cor.to_f <= BOARD_WIDTH && x_cor.to_f > 0 && y_cor.to_f <= BOARD_HEIGHT && y_cor.to_f > 0
  end
end
