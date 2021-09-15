// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-ui/datepicker
//= require jquery_ujs
//= require angular
//= require sugar
//= require angular-resource

//= require angular-sanitize
//= require showdown
//= require angular-markdown-directive
//= require ngInfiniteScroll

//= require bootstrap
//= require best_in_place
//= require typeahead.bundle
//= require tagmanager
//= require_tree .

$(document).ready(function () {
  jQuery(".best_in_place").best_in_place();
});

jQuery(function ($) {
  $.datepicker.regional["fr"] = {
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    showMonthAfterYear: true,
  };
  $.datepicker.setDefaults($.datepicker.regional["fr"]);
});
