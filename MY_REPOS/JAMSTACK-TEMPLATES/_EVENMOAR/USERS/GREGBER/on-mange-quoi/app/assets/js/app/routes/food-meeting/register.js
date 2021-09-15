define([
  'app/views/food-meeting/register',
  'app/models/food-meeting'
],
function (
  View,
  FoodMeeting
) {
  'use strict';
  return function (id) {
    return (new View({
      model: new FoodMeeting({
        _id: id
      })
    })).render();
  };
});