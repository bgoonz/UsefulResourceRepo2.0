json.array!(@items) do |item|
  json.extract! item, :id, :summary, :body, :language, :created_at, :updated_at
  if item.author
    json.author item.author.name
    json.author_path person_path(item.author)
    json.path polymorphic_path(item)

  end

  json.tags item.taggings do |t|
    json.id t.tag.id
    json.url url_for(t.tag)
    json.name t.tag.name
  end

end
