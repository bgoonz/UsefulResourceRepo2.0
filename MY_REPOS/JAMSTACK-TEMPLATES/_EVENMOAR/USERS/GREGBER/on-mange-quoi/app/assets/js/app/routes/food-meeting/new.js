define([
  'app/views/food-meeting/new',
  'app/models/food-meeting'
],
function (
  View,
  FoodMeeting
) {
  'use strict';
  return function () {
    return (new View({
      model: new FoodMeeting()
    })).render();
  };
});