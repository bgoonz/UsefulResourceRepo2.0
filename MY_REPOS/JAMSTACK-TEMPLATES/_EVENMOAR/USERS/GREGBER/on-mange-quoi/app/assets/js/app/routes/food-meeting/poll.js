define([
  'app/views/food-meeting/poll',
  'app/models/poll'
],
function (
  View,
  Poll
) {
  'use strict';
  return function (id, email, hash) {
    return (new View({
      model: new Poll({
        foodMeeting: id
      }),
      email: email,
      hash: hash
    })).render();
  };
});