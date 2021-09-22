// See sagas/jekyll.js for the jekyll command implementation

export function jekyll(names) {
  return {
    type: 'JEKYLL',
    payload: names
  };
}
