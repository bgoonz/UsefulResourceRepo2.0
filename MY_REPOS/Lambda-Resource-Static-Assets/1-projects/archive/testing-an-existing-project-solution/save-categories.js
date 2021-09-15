function saveCategories(categories, newCategory) {
  categories.push(newCategory);
  categories.sort();
  return categories.map((x) => x);
}

exports.saveCategories = saveCategories;
