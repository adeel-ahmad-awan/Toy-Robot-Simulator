let move_error = 'invalid move'
let directions = ["north", "east", "south", 'west'];

window.input_form_submit = function(event) {
  event.preventDefault();
  let x_cor =  document.getElementById("x_cor").value
  let y_cor =  document.getElementById("y_cor").value
  let direction =  document.getElementById("direction").value

  clear_board();
  if (valid_move(x_cor, y_cor, direction)) {
    place_robot(x_cor, y_cor, direction);
  } else {
    display_feedback('error', 'invalid position')
  }

}

window.turn_left = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction

  let new_direction_index =  directions.indexOf(direction) - 1;
  if (new_direction_index < 0) {
    new_direction_index = directions.length - 1
  }

  if (valid_move(x_cor, y_cor, direction)) {
    clear_board();
    place_robot(x_cor, y_cor, directions[new_direction_index]);
  } else {
    display_feedback('error', move_error)
  }
}

window.turn_right = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction

  let new_direction_index =  directions.indexOf(direction) + 1;
  if (new_direction_index == directions.length) {
    new_direction_index = 0
  }


  if (valid_move(x_cor, y_cor, direction)) {
    clear_board();
    place_robot(x_cor, y_cor, directions[new_direction_index]);
  } else {
    display_feedback('error', move_error)
  }

}

window.move_forward = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction

  if (direction == 'north') {
    y_cor = parseInt(y_cor) + 1;
  } else if (direction == 'south') {
    y_cor = parseInt(y_cor) - 1;
  } else if (direction == 'east') {
    x_cor = parseInt(x_cor) + 1;
  } else if (direction == 'west') {
    x_cor = parseInt(x_cor) - 1;
  } else {
    display_feedback('error', move_error)
  }

  if (valid_move(x_cor, y_cor, direction)) {
    clear_board();
    place_robot(x_cor, y_cor, direction);
  } else {
    display_feedback('error', move_error)
  }
}

window.view_current_position = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction

  display_feedback('success', x_cor + ', ' + y_cor + ', ' + direction)
}

function place_robot(x_cor, y_cor, direction) {
  if (x_cor < 6 && x_cor > 0 && y_cor < 6 && y_cor > 0 ) {
    let image_name = 'robo_tank_' + direction + '.jpg';
    let img = document.createElement("img");
    img.src = "/" + image_name;
    img.className="robot_img"
    img.dataset.direction = direction;
    img.dataset.x_cor = x_cor;
    img.dataset.y_cor = y_cor;


    document.getElementById(x_cor+'_'+y_cor).appendChild(img);
    display_feedback('success', '')
  } else {
    display_feedback('error', move_error)
  }
}

function clear_board() {
  let boxes = document.getElementsByClassName("box");
  for (i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }
  return [x_cor, y_cor, direction]
}


function valid_move(x_cor, y_cor, direction) {
  if (x_cor < 6 && x_cor > 0 && y_cor < 6 && y_cor > 0 ) {
    return true;
  } else {
    return false;
  }
}

function display_feedback(type, msg) {
  let feedback = document.getElementsByClassName("feedback")[0]
  feedback.innerHTML = msg;
  if (type == 'success') {
    feedback.style.color = 'green';
  } else {
    feedback.style.color = 'red';
  }
}
