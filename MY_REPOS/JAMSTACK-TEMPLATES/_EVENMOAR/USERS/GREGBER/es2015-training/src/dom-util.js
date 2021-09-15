export const setElementStyle = (element, style) =>
  Object.assign(element.style, style);

export const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));
