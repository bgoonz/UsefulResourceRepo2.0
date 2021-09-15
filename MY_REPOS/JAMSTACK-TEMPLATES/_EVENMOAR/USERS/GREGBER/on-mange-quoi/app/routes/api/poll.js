var Poll = require(global.base + '/app/models/poll'),
moment = require('moment');

exports = module.exports = {

  findAll: function (req, res) {
    var now;

    if (req.query.current) {

      now = moment().hour(0).minute(0).second(0).millisecond(0);

      req.query.created = {
        $gte: now.toDate(),
        $lt: now.clone().add('d', 1).toDate()
      };

      delete req.query.current;
    }

    Poll.find(req.query).exec(function (err, polls) {
      res.send(polls);
    });
  },

  add: function (req, res) {
    var poll = new Poll(req.body);
    poll.save(function (err) {
      if (err) {
        return res.send({error: true});
      }

      return res.send(poll);
    });
  },

  update: function (req, res) {
    var data = req.body;
    delete data._id;

    Poll.findByIdAndUpdate(req.params.id, data, function (err, poll) {
      if (err) {
        return res.send({error: true});
      }

      return res.send(poll);
    });
  }
};