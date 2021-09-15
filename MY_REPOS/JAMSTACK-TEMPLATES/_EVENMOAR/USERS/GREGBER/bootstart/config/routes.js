var ROUTE_DIR = global.base + '/app/routes',
routes = function (app) {
  app.get('/', require(ROUTE_DIR + '/home').show);
};

exports = module.exports = routes;