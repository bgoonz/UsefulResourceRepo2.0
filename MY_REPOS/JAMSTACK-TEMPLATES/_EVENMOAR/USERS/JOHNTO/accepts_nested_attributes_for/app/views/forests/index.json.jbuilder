json.array!(@forests) do |forest|
  json.extract! forest, :id, :name, :size, :latitude, :longitude, :climate
  json.url forest_url(forest, format: :json)
end
