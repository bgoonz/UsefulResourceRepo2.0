class CreateBookings < ActiveRecord::Migration[5.1]
  def change
    create_table :bookings do |t|
      t.decimal :guests
      t.date :start_at
      t.date :end_at
      t.decimal :total_price
      t.references :rental, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
