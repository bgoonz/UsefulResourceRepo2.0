const util = require("util");
const request = util.promisify(require("request"));

const server = require("../../src/server");

const getAccessToken = require("./getAccessToken");

module.exports = async query => {
  const { access_token } = await getAccessToken();

  const response = new Promise((resolve, reject) => {
    server.listen({ port: 0 }, () => {
      const { port } = server.address();
      console.log(`Test server running on port ${port}`);

      request({
        url: `http://localhost:${server.address().port}/graphql`,
        method: "POST",
        headers: { authorization: access_token },
        json: { query }
      })
        .then(response => {
          server.close();
          resolve(response);
        })
        .catch(e => reject(e));
    });
  });

  return response;
};
