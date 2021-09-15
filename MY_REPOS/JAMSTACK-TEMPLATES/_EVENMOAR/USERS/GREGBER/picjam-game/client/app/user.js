(function (angular, _) { 'use strict';

  /**
   * Game controller.
   */

  angular.module('picjam.user', [])
  .factory('User', function () {
    function User(data) {
      _.defaults(this, data, {
        score: 0,
        me: false
      });
    }

    return User;
  });

}(window.angular, window._));
