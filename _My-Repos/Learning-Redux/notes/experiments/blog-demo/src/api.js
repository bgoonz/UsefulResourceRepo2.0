export default {
  fetch: async (path) => {
    const response = await fetch(`http://localhost:3000/api/${path}`);
    return response.json();
  },
  post: async (path, body) => {
    const response = await fetch(`http://localhost:3000/api/${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
};
