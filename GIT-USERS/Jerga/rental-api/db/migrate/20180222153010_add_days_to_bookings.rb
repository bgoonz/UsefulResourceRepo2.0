class AddDaysToBookings < ActiveRecord::Migration[5.1]
  def change
    add_column :bookings, :days, :decimal
  end
end
