$(document).ready(function () {
  $("#up").click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
  resizeCode();
  window.addEventListener("resize", resizeCode);
});

function resizeCode() {
  if ($(window).width() <= 768) {
    $(".code").css("width", $(window).width() - 40 + "px");
  } else {
    $(".code").css("width", "95%");
  }
}
