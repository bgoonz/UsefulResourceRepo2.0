/*! Angular pretty-bytes v1.0.1 | © 2014 Greg Bergé | License MIT */
(function (window, angular, undefined) { 'use strict';

  /**
   * Pretty bytes filter.
   * Display bytes in a human readable format.
   */

  angular.module('prettyBytes', [])
  .filter('prettyBytes', function () {
    return prettyBytes;
  });

}(window, window.angular));