var FoodMeeting = require(global.base + '/app/models/food-meeting'),
route = {

  findAll: function (req, res) {
    FoodMeeting.find(req.query).exec(function (err, foodMeetings) {
      res.send(foodMeetings);
    });
  },

  add: function (req, res) {
    var foodMeeting = new FoodMeeting(req.body);
    foodMeeting.save(function (err) {
      if (err) {
        return res.send({error: true});
      }

      return res.send(foodMeeting);
    });
  },

  find: function (req, res) {
    FoodMeeting.findById(req.params.id).exec(function (err, foodMeeting) {
      res.send(foodMeeting);
    });
  },

  update: function (req, res) {
    var data = req.body;
    delete data._id;

    data.users = FoodMeeting.hashUsers(data.users);

    FoodMeeting.findByIdAndUpdate(req.params.id, data, function (err, foodMeeting) {
      if (err) {
        return res.send({error: true});
      }

      return res.send(foodMeeting);
    });
  }
};

exports = module.exports = route;