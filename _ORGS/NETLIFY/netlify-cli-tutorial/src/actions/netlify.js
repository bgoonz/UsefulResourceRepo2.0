// See sagas/netlify.js for the netlify command implementation

export function netlify(names) {
  return {
    type: 'NETLIFY',
    payload: names
  };
}
