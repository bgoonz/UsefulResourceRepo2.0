// DIRECTIVES
weatherApp.directive("weatherReport", function () {
  return {
    restrict: "E",
    templateUrl: "../weatherAPI/directives/weatherReport.ejs",
    replace: true,
    scope: {
      weatherDay: "=",
      convertToStandard: "&",
      convertToDate: "&",
      dateFormat: "@",
    },
  };
});
