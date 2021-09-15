$(document).ready(function () {
  var img = $("#show .thumbnail");
  //  var thumbnail = $("#show .thumbnail");

  var list = [];

  $.each($("#show"), function (i, show) {
    $(".thumbnail", show).each(function () {
      list.push($(this));
    });
  });

  list.forEach(function (e) {
    e.on("mouseenter", function () {
      e.addClass("show backgroundhover");
      e.find("img").addClass("hoverable");
      e.find("a.btn-primary").addClass("buttoncolo");
      e.find("a.btn-primary").addClass("buttoncolo:hover");
    });
    e.on("mouseleave", function () {
      e.removeClass("show backgroundhover");
      e.find("img").removeClass("hoverable");
      e.find("a").removeClass("buttoncolo");
    });
  });
});
