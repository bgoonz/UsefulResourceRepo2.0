document.addEventListener("turbolinks:load", function () {
  if ($(".my-shuffle-container").length > 0) {
    var Shuffle = window.Shuffle;
    var element = document.querySelector(".my-shuffle-container");
    var sizer = element.querySelector(".my-sizer-element");

    var shuffleInstance = new Shuffle(element, {
      itemSelector: ".blog-item",
      sizer: sizer,
    });
  }
});
