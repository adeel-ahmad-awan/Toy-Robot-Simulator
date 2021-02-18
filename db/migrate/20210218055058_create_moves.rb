class CreateMoves < ActiveRecord::Migration[6.0]
  def change
    create_table :moves do |t|
      t.string :x_cor
      t.string :y_cor
      t.string :direction

      t.timestamps
    end
  end
end
