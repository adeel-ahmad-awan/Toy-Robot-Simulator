Rails.application.routes.draw do
  get 'frontend/home'
  post 'frontend/move'
  post 'frontend/place_robot'
  post 'frontend/turn_left'
  post 'frontend/turn_right'
  root 'frontend#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
