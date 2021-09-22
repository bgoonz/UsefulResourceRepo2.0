
/* ****************** STUDENTS SHOULD NOT MODIFY THIS FILE ************** */

const assert = require('assert');
const http = require('http');

const baseUrl = 'http://localhost:8081';

// Helper method for making an HTTP request.
const request = (url, method) => new Promise((resolve, reject) => {
  const options = {
    method: method || 'GET',
  };
  http.request(url, options, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    res.on('error', (err) => reject(err));
  }).end();
});

// Here are our plain-text requests (paths and expected responses):
const plainTextRequests = {
  '/': 'Hello from Express!',
  '/xyz': 'That\'s all I wrote.',
  '/aboutxyz': 'That\'s all I wrote.',
  '/about_xyz': 'That\'s all I wrote.',
  '/about-xyz': 'That\'s all I wrote.',
  '/capital-letters/abc': 'ABC',
  '/capital-letters/asdf': 'ASDF',
  '/margot/bio': 'Bio',
  '/margot/contact': 'Contact',
  '/margeaux/bio': 'Bio',
  '/margeaux/contact': 'Contact',
};

Object.entries(plainTextRequests).forEach(([path, response]) => {
  describe(path, () => {
    it(`should return the plain text response "${response}"`, async () => {
      const { body } = await request(`${baseUrl}${path}`);
      assert.strictEqual(body, response);
    });
  });
});

// Here are our HTML requests (paths and methods):
const htmlRequests = [
  ['/about', 'GET'],
  ['/about', 'POST'],
  ['/foo', 'GET'],
  ['/foo', 'POST'],
  ['/about-foo', 'GET'],
  ['/about-foo', 'POST'],
  ['/about_foo', 'GET'],
  ['/about_foo', 'POST'],
  ['/about2', 'GET'],
  ['/about2', 'POST'],
  ['/About', 'GET'],
  ['/About', 'POST'],
  ['/ABOUT', 'GET'],
  ['/ABOUT', 'POST'],
];

htmlRequests.forEach(([path, method]) => {
  describe(path, () => {
    it('should return an HTML response rendered by a Pug view containing the HTTP method used for the request, the path of the request, and a random number', async () => {
      const { body } = await request(`${baseUrl}${path}`, method);
      assert.notEqual(body.match(`<li>${method}</li>`), null);
      assert.notEqual(body.match(`<li>[/]?${path.substring(1)}</li>`), null);
      assert.notEqual(body.match('<li>\\d+</li>'), null);
    });
  });
});

// Making a request using an unexpected path should result in a 404.

describe('/about/foo', () => {
  it('should return a 404', async () => {
    const { statusCode } = await request(`${baseUrl}/about/foo`);
    assert.strictEqual(statusCode, 404);
  });
});
