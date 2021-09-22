// START: closure.
(async () => {
  // Test URL.
  const url = '/?rest_route=/wp/v2/posts&per_page=100';

  // Example options.
  const options = {
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
  }

  // Ajax.
  try {
    const result = await fetch(url, options);
    const payload = await result.json();

    // Log response.
    console.log(payload);
  } catch (e) {
    // No-op.
  }

  // END: closure.
})();
