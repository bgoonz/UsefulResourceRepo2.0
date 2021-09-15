function mergeCategories(template, categories, tagName) {
  let lis = '';

  for (let category of categories) {
    lis += `<${tagName}>${category}</${tagName}>`;
  }

  return template.replace('<!-- Content here -->', lis);
};

exports.mergeCategories = mergeCategories;
