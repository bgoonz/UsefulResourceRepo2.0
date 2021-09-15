var FoodMeeting = require(global.base + '/app/models/food-meeting'),
mail = require(global.base + '/lib/mail'),
config = require(global.base + '/config/config'),
_process = {

  template: null,

  getFoodMeetings: function (callback) {
    FoodMeeting.find().exec(function (err, foodMeetings) {
      if (err) {
        return console.log(err);
      }

      callback(foodMeetings);
    });
  },

  processFoodMeetings: function (foodMeeting) {
    foodMeeting.users.forEach(function (user) {
      _process.processFoodMeetingUser(foodMeeting, user);
    });
  },

  processFoodMeetingUser: function (foodMeeting, user) {
    var data = {
      link: 'http://' + config.server.domain + '/food-meeting/' + foodMeeting._id + '/poll/' + user.email + '-' + user.hash,
      unsubscribeLink: 'http://' + config.server.domain + '/food-meeting/' + foodMeeting._id + '/unsubscribe/' + user.email + '-' + user.hash
    };

    mail('poll', data, {
      from: 'On-mange-quoi <noreply@on-mange-quoi.co>',
      to: [user.email],
      subject: 'C\'est l\'heure de voter'
    }, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('poll email sent to ', user.email);
    });
  },

  exec: function () {
    _process.getFoodMeetings(function (foodMeetings) {
      foodMeetings.forEach(_process.processFoodMeetings);
    });
  }
};

module.exports = exports = _process.exec;