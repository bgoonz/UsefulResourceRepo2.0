'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('custom', {
		user: req.user || null,
		request: req
	});
};
