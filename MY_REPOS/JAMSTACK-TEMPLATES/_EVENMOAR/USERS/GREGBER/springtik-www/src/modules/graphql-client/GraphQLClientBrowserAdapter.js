import 'whatwg-fetch';

export default class GraphQLClientBrowserAdapter {
  fetch(params) {
    return fetch(`${window.location.origin}/graphql`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(params),
    })
    .then(response => response.json());
  }
}
