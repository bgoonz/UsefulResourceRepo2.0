/* global -_*/
var _ = require('lodash'),
mongoose = require('mongoose'),
crypto = require('crypto'),

hashUser = function (user) {
  var shasum = crypto.createHash('sha1');
  shasum.update(user.email);
  user.hash = shasum.digest('hex').substring(0, 5);
  return user;
},

hashId = function (id) {
  var shasum = crypto.createHash('sha1');
  shasum.update(id + '');
  return shasum.digest('hex').substring(0, 5);
},

userSchema = new mongoose.Schema({
  email: String,
  hash: String,
  lastSentDate: Date
}),

foodMeetingSchema = new mongoose.Schema({
  venues: mongoose.Schema.Types.Mixed,
  users: [userSchema],
  hash: String,
  created: {type: Date, 'default': Date.now}
});

foodMeetingSchema.statics.hashUsers = function (users) {
  return _.map(users, hashUser);
};

foodMeetingSchema.pre('save', function (next) {
  this.hash = hashId(this._id);
  this.users = foodMeetingSchema.statics.hashUsers(this.users);
  next();
});

module.exports = exports = mongoose.model('FoodMeeting', foodMeetingSchema);