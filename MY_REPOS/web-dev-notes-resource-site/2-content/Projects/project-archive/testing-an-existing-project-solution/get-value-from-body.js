const { parse } = require('querystring');

function getValueFromBody(body, key) {
  const o = parse(body);
  return o[key] || '';
}

exports.getValueFromBody = getValueFromBody;
