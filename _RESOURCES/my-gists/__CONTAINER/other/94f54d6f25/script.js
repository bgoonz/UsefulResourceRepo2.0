window.loadGalery = function () {
  if (jQuery(".cf-items").hasClass("masonry")) {
    var mode = "masonry";
  } else {
    var mode = "fitRows";
  }
  var $grid = jQuery(".cf-items").isotope({
    itemSelector: ".cf-item",
    layoutMode: mode,
  });
  jQuery(".filter-button-group").on("click", "button", function () {
    jQuery(this).addClass("active-tab").siblings().removeClass("active-tab");
    var filterValue = jQuery(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
};
