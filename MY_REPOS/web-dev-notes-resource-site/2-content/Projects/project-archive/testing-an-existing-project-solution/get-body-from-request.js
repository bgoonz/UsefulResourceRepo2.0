function getBodyFromRequest(req) {
  let data = '';
  return new Promise(resolve => {
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
  });
}

exports.getBodyFromRequest = getBodyFromRequest;
