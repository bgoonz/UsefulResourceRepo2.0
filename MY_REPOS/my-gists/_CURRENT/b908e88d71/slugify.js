
const slugify = str =>
  str
    .toLowerCase ()
    .trim ()
    .replace (/[^\w\s-]/g, '')
    .replace (/[\s_-]+/g, '-')
    .replace (/^-+|-+$/g, '');