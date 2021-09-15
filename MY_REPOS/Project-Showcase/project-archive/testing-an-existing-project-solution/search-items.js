function searchItems(items, term) {
  term = term.toLowerCase();
  return items.filter(x => {
    const title = x.title.toLowerCase();
    return title.indexOf(term) >= 0;
  });
}

exports.searchItems = searchItems;
