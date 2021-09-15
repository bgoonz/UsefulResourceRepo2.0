export const clUrl = (publicId, options) => {
  options = options ? `${options}/` : '';
  return `http://res.cloudinary.com/springtik/image/upload/${options}${publicId}`;
};
