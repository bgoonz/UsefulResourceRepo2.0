function saveItems(items, newItem) {
  items.push(newItem);
  return [...items];
}

exports.saveItems = saveItems;
