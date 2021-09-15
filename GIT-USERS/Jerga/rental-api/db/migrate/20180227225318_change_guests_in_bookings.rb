class ChangeGuestsInBookings < ActiveRecord::Migration[5.1]
  def change
    change_column :bookings, :guests, :integer
  end
end
