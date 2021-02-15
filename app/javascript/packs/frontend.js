let move_error = 'invalid move'
let directions = ["north", "east", "south", 'west'];

window.input_form_submit = function(event) {
  event.preventDefault();
  let x_cor =  document.getElementById("x_cor").value
  let y_cor =  document.getElementById("y_cor").value
  let direction =  document.getElementById("direction").value
  let url =  document.getElementById("input_form_submit_id").dataset.submit
  let data = [x_cor, y_cor, direction]
  send_ajax(url, data)
}

window.turn_left = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];
  if((typeof(robot) == "undefined")) {
    return
  }

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction
  let url =  document.getElementById("input_turn_left").dataset.submit
  let data = [x_cor, y_cor, direction]
  send_ajax(url, data)

}

window.turn_right = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];
  if((typeof(robot) == "undefined")) {
    return
  }

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction
  let url =  document.getElementById("input_turn_right").dataset.submit
  let data = [x_cor, y_cor, direction]
  send_ajax(url, data)
}

window.move_forward = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];
  if((typeof(robot) == "undefined")) {
    return
  }

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction
  let url =  document.getElementById("input_move_forward").dataset.submit
  let data = [x_cor, y_cor, direction]
  send_ajax(url, data)
}

window.view_current_position = function(event) {
  let robot = document.getElementsByClassName("robot_img")[0];
  if((typeof(robot) == "undefined")) {
    return
  }

  let x_cor =  robot.dataset.x_cor
  let y_cor =  robot.dataset.y_cor
  let direction =  robot.dataset.direction

  display_feedback('success', x_cor + ', ' + y_cor + ', ' + direction)
}

function place_robot(x_cor, y_cor, direction) {
    let image_name = 'robo_tank_' + direction + '.jpg';
    let img = document.createElement("img");
    img.src = "/" + image_name;
    img.className="robot_img"
    img.dataset.direction = direction;
    img.dataset.x_cor = x_cor;
    img.dataset.y_cor = y_cor;
    document.getElementById(x_cor+'_'+y_cor).appendChild(img);
}

function clear_board() {
  let boxes = document.getElementsByClassName("box");
  for (i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }
  return [x_cor, y_cor, direction]
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


function send_ajax(url, data) {
  data = {authenticity_token: $('[name="csrf-token"]')[0].content, data: data}

  $.ajax({
  type: "POST",
  url: url,
  data: data,
  cache: false,
  success: function(response){
    if (response.status == 'error') {
      display_feedback(response.status, response.message)
    } else if (response.status == 'success') {
      clear_board()
      display_feedback(response.status, '')
      place_robot(response.position.x_cor, response.position.y_cor, response.position.direction)
    }
  }});
}
