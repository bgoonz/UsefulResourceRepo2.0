class ChangeColumnTotalPriceInBookings < ActiveRecord::Migration[5.1]
  def change
    change_column :bookings, :total_price, :integer
    change_column :bookings, :days, :integer
  end
end
