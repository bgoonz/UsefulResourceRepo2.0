import slugify from 'underscore.string/slugify';

const PATH_REGEXP = /^\/activities\/[\w-]*-(\d+)$/;

export const formatLink = ({
  id,
  category,
  city,
  slug,
}) => `/activities/${slugify(city)}-${slugify(category)}-${slug}-${id}`;

export const parseLink = path => {
  const matches = path.match(PATH_REGEXP);

  if (!matches)
    return null;

  return {
    id: matches[1],
  };
};
