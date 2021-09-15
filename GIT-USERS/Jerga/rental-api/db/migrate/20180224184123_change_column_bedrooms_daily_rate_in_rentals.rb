class ChangeColumnBedroomsDailyRateInRentals < ActiveRecord::Migration[5.1]
  def change
    change_column :rentals, :bedrooms, :integer
    change_column :rentals, :daily_rate, :integer
  end
end
