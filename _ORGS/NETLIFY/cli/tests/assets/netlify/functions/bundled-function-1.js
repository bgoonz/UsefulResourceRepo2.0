// netlify/functions/bundled-function-1.js
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: "Pre-bundled"
  };
};
