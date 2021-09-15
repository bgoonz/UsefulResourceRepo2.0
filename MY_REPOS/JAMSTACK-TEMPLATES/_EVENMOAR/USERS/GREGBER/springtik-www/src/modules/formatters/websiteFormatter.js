export const formatWebsite = website => {
  return website.replace(/^https?:\/\//, '').replace(/\/$/, '');
};
