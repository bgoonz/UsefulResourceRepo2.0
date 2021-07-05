'use strict';

module.exports = function(app) {
	// Root routing
	var custom = require('../../app/controllers/custom.server.controller');
	app.route('/custom').get(custom.index);
};
