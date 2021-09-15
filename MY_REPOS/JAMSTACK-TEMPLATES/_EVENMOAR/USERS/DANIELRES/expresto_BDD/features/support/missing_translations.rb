missing_translations = []

After do |scenario|
  temp = all('.translation_missing')
  if temp.any?
    missing_translations << temp.to_a
    raise "Missing Translation"
  end
end

at_exit do
  if missing_translations.any?
    keys = missing_translations.flatten.map do |translation|
      translation[:title]
    end.uniq

    puts '-------------------------------------------------------------'
    puts "There are #{keys.length} untranslated strings. Please check your locales:"
    puts '-------------------------------------------------------------'
    puts "\n"
    keys.each do |translation|
      puts translation
    end
    puts "\n"
  end
end