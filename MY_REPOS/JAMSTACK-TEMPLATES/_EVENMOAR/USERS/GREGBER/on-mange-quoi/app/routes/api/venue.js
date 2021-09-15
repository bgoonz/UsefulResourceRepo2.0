var config = require(global.base + '/config/config');

exports = module.exports = {
  findAll: function (req, res) {
    var foursquare = (require('foursquarevenues'))(config.foursquare.clientId, config.foursquare.clientSecret);

    // restrict to food section
    req.query.section = 'food';

    foursquare.exploreVenues(req.query,
      function (error, venues) {
        if (error) {
          res
          .status(400)
          .send({error: true});
        }
        else {
          res.send(venues.response.groups[0].items);
        }
      }
    );
  }
};